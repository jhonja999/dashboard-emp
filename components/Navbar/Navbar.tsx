//Navbar del dashboard con buscador
"use client";

import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Menu, Search } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";

// Type definitions
interface NavbarProps {
  onToggleSidebar: () => void;
}

interface Route {
  label: string;
  href: string;
}

interface Company {
  id: string;
  name: string;
}

// Static routes with keywords
const POSSIBLE_ROUTES: Route[] = [
  { label: "Home", href: "/" },
  { label: "Dashboard, Inicio", href: "/dashboard" },
  { label: "Companies, Compañias, Contacto, Empleado", href: "/companies" },
  { label: "Calendar, Evento, Reunión", href: "/tasks" },
  { label: "Analytics, Métricas, Metricas, Gráfico, Grafico, usuarios, cantidad", href: "/analytics" },
  { label: "Faqs, Preguntas", href: "/faqs" },
  { label: "Perfil, Profile, Usuario", href: "/profile" },
  { label: "Configuración, Settings", href: "/settings" },
];

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Route[]>([]);

  // Memoized filtered routes
  const filteredRoutes = useMemo(() => 
    searchTerm
      ? POSSIBLE_ROUTES.filter((route) =>
          route.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [],
    [searchTerm]
  );

  // Memoized company ID check
  const isCompanyId = useMemo(() => 
    searchTerm.match(/^[a-zA-Z0-9]{12,}$/),
    [searchTerm]
  );

  // Memoized final suggestions
  const finalSuggestions = useMemo(() => 
    [...filteredRoutes, ...results],
    [filteredRoutes, results]
  );

  // Callbacks for handlers
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleRouteClick = useCallback((href: string) => {
    router.push(href);
    setSearchTerm("");
  }, [router]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }, [searchTerm]); // Include searchTerm in dependencies

  // Search function with error handling
  const handleSearch = useCallback(async () => {
    if (isCompanyId) {
      handleRouteClick(`/companies/${searchTerm}`);
      return;
    }

    try {
      setLoading(true);
      setResults([]);

      const { data } = await axios.get<Company[]>("/api/companies/search", {
        params: { term: searchTerm },
      });

      setResults(
        data.map((company) => ({
          label: company.name,
          href: `/companies/${company.id}`,
        }))
      );
    } catch (error) {
      console.error("Error searching companies:", error);
      // Consider adding error state and UI feedback
    } finally {
      setLoading(false);
    }
  }, [searchTerm, isCompanyId, handleRouteClick]);

  // Extracted Suggestion component
  const SuggestionsList = React.memo(function SuggestionsList() {
    if (!searchTerm) return null;

    return (
      <div className="absolute z-10 mt-1 w-full bg-popover border border-border rounded-md shadow-lg text-foreground">
        {finalSuggestions.length > 0 ? (
          finalSuggestions.map((route) => (
            <button
              key={route.href}
              onClick={() => handleRouteClick(route.href)}
              className="w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-colors rounded-md"
            >
              {route.label}
            </button>
          ))
        ) : (
          <div className="px-3 py-2 text-sm text-muted-foreground">
            {loading ? "Buscando..." : "No results"}
          </div>
        )}
      </div>
    );
  });

  return (
    <nav className="flex items-center px-4 gap-x-4 md:px-6 justify-between w-full bg-background border-b h-20 relative">
      <div className="block xl:hidden">
        <Button variant="outline" onClick={onToggleSidebar}>
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      <div className="relative w-[380px] hidden md:block">
        <Input
          placeholder="Buscar rutas, palabras clave o ID"
          className="rounded-lg"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        <Search 
          strokeWidth={1} 
          className="absolute top-2 right-2 text-muted-foreground" 
        />
        <SuggestionsList />
      </div>

      <div className="flex gap-x-2 items-center">
        <ThemeToggle />
        <UserButton />
      </div>
    </nav>
  );
}
