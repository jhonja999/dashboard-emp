import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const { userId } = await auth(); // 🔹 Espera la respuesta de auth()

  if (!userId) throw new Error("Unauthorized");
  return { userId };
};

// Middleware for public routes
const handlePublicAuth = () => {
  return { isPublic: true };
};

export const ourFileRouter = {
  // Protected route for profile images (requires authentication)
  profileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      return { fileUrl: file.url };
    }),

  // Protected route for document uploads
  protectedDocuments: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
    pdf: { maxFileSize: "8MB", maxFileCount: 1 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(({ metadata, file }) => {
      console.log("Document upload complete for userId:", metadata.userId);
      return { fileUrl: file.url };
    }),

  // Public route for general image uploads
  publicImages: f({ image: { maxFileSize: "2MB", maxFileCount: 5 } })
    .middleware(() => handlePublicAuth())
    .onUploadComplete(({ file }) => {
      console.log("Public image uploaded:", file.url);
      return { fileUrl: file.url };
    }),

  // Public route for avatar uploads
  publicAvatar: f({ image: { maxFileSize: "1MB", maxFileCount: 1 } })
    .middleware(() => handlePublicAuth())
    .onUploadComplete(({ file }) => {
      console.log("Public avatar uploaded:", file.url);
      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;