"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ui/theme-toggle";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  id: string;
}

export function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const { scrollY } = useScroll();
  const router = useRouter();
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const prevScrollY = useRef(0);
  const rafId = useRef<number | null>(null);
  const sectionsRef = useRef<{[key: string]: HTMLElement | null}>({});

  // Use useMemo for navItems to keep reference stable
  const navItems = useMemo<NavItem[]>(() => [
    { label: "Home", href: "/#inicio", id: "inicio" },
    { label: "About", href: "/#acerca", id: "acerca" },
    { label: "Services", href: "/#servicios", id: "servicios" },
    { label: "Projects", href: "/#proyectos", id: "proyectos" },
    { label: "Contact", href: "/#contacto", id: "contacto" },
  ], []);

  // Memoized colors to prevent recalculation on each render
  const colors = useMemo(() => ({
    gold: "#d4af37",
    goldLight: "rgba(212, 175, 55, 0.2)",
    goldMedium: "rgba(212, 175, 55, 0.3)",
    darkBg: "rgba(17, 17, 17, 0.95)"
  }), []);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const currentScroll = scrollY.get();
    
    // Avoid unnecessary state updates
    if (Math.abs(currentScroll - prevScrollY.current) < 5) return;
    
    prevScrollY.current = currentScroll;
    setIsScrolled(currentScroll > 10);

    // Only run section detection if we need to (we're on the homepage)
    if (pathname === '/' || pathname === '') {
      // Cancel any existing RAF to prevent stacking
      if (rafId.current) window.cancelAnimationFrame(rafId.current);
      
      // Using requestAnimationFrame for better performance
      rafId.current = window.requestAnimationFrame(() => {
        // Check if we need to create refs to DOM elements 
        const sections = navItems.map((item) => item.id);
        let newActiveSection = activeSection;
        
        // Using cached element references
        for (const section of sections) {
          if (!sectionsRef.current[section]) {
            sectionsRef.current[section] = document.getElementById(section);
          }
          
          const element = sectionsRef.current[section];
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              newActiveSection = section;
              break;
            }
          }
        }
        
        // Only update state if the section changed
        if (newActiveSection !== activeSection) {
          setActiveSection(newActiveSection);
        }
      });
    }
  }, [scrollY, navItems, activeSection, pathname]);

  // Clean up RAF on unmount
  useEffect(() => {
    return () => {
      if (rafId.current) window.cancelAnimationFrame(rafId.current);
    };
  }, []);

  useEffect(() => {
    const unsubscribeScroll = scrollY.onChange(handleScroll);
    return () => {
      unsubscribeScroll();
      if (rafId.current) window.cancelAnimationFrame(rafId.current);
    };
  }, [handleScroll, scrollY]);

  // Reset mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
    
    // Clear the section refs when the pathname changes
    if (pathname !== '/' && pathname !== '') {
      sectionsRef.current = {};
    }
  }, [pathname]);

  // Desktop navigation link - memoized component with fewer recalculations
  const DesktopNavLink = useCallback(({ item }: { item: NavItem }) => {
    const isActive = activeSection === item.id;
    
    return (
      <Link
        href={item.href}
        className={cn(
          "relative py-2 px-3 transition-colors duration-200 rounded-lg",
          isActive ? `text-[${colors.gold}]` : "text-[#f7f2e8]",
          `hover:text-[${colors.gold}]`
        )}
      >
        <span className="relative z-10">{item.label}</span>
        {isActive && (
          <motion.div
            layoutId="activeBackground"
            className={`absolute inset-0 bg-[${colors.gold}]/10 rounded-lg`}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </Link>
    );
  }, [activeSection, colors]);

  // Mobile navigation link - memoized component with fewer recalculations 
  const MobileNavLink = useCallback(({ item }: { item: NavItem }) => {
    const isActive = activeSection === item.id;
    
    return (
      <Link
        href={item.href}
        className={cn(
          "relative py-3 px-4 transition-colors duration-200 rounded-full",
          "focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 block w-full",
          isActive ? "text-[#d4af37] bg-[#d4af37]/10" : "text-[#f7f2e8]",
          "hover:bg-[#d4af37]/10"
        )}
        onClick={() => setMobileMenuOpen(false)}
      >
        <span className="relative z-10">{item.label}</span>
      </Link>
    );
  }, [activeSection]);

  // Optimized mobile menu animation variants - memoized to prevent recreation on renders
  const mobileMenuVariants = useMemo(() => ({
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 }
  }), []);

  // Memoized navbar background styles
  const navbarStyle = useMemo(() => ({
    backgroundColor: isScrolled || mobileMenuOpen ? colors.darkBg : "transparent",
    backdropFilter: isScrolled || mobileMenuOpen ? "blur(8px)" : "none",
    borderBottom: `1px solid ${isScrolled || mobileMenuOpen ? colors.goldLight : "transparent"}`,
  }), [isScrolled, mobileMenuOpen, colors]);

  // Mobile menu toggle with debounce to prevent rapid toggling
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  // Memoize the route navigation action
  const navigateToDashboard = useCallback(() => {
    setMobileMenuOpen(false);
    router.push("/dashboard");
  }, [router]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full z-50 transition-colors duration-200"
      style={navbarStyle}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Logo />

          {/* Desktop navigation links - avoid rendering when not needed */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <DesktopNavLink key={item.id} item={item} />
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <SignedIn>
              <div className="hidden md:flex items-center space-x-2">
                <Button
                  variant="ghost"
                  className="items-center gap-2 text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors duration-200"
                  onClick={navigateToDashboard}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
                {/* UserButton hidden in top bar on mobile */}
                <div className="hidden md:block">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="outline"
                  className="hidden md:flex text-[#d4af37] border-[#d4af37] hover:bg-[#d4af37]/10 transition-colors duration-200"
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>

            {/* Rounded mobile menu button with ripple effect */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-[#d4af37] relative overflow-hidden rounded-full"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="absolute inset-0 bg-[#d4af37]/20 rounded-full 
                transition-transform duration-300 
                group-hover:scale-150 group-hover:opacity-0"
              />
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu - uses React.memo internally via AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="md:hidden py-4 border-t border-[#d4af37]/20 text-center"
            >
              <div className="flex flex-col space-y-2 px-2">
                {navItems.map((item) => (
                  <MobileNavLink key={item.id} item={item} />
                ))}

                <SignedOut>
                  <div className="pt-4 px-2">
                    <SignInButton mode="modal">
                      <Button 
                        className="w-full bg-[#d4af37] text-[#1c1c1c] hover:bg-[#b58f2d] transition-colors duration-200 rounded-full"
                      >
                        Sign In
                      </Button>
                    </SignInButton>
                  </div>
                </SignedOut>

                <SignedIn>
                  <div className="flex flex-col space-y-2 pt-4 px-2">
                    {/* UserButton shown only in mobile menu when expanded */}
                    <div className="flex justify-center py-2">
                      <UserButton afterSignOutUrl="/" />
                    </div>
                    <Button
                      className="w-full bg-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/30 transition-colors duration-200 rounded-full"
                      onClick={navigateToDashboard}
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </div>
                </SignedIn>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}