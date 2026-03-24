import { generateReactHelpers } from "@uploadthing/react";

import type { OurFileRouter } from "@/lib/uploadthing-server";

export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();
