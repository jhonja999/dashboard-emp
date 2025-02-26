// lib/uploadthing.ts
import {
  generateReactHelpers,
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

// Generate the React components
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

// Generate React helpers for the client
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();