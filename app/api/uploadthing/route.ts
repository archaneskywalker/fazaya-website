import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "@/lib/uploadthing-server";

// Export handlers for Next.js App Router
const handler = createRouteHandler({
  router: ourFileRouter,
});

export { handler as GET, handler as POST };
