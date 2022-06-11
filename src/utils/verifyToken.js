import { handleError } from "./handleError";

export const verifyToken = async (request, adminAuth, requireAuth = true) => {
  const header = request.variables?.["Authorization"];

  if (header) {
    const [bearer, token] = header.split(" ");

    if (bearer !== "Bearer") handleError("Invalid token");

    const decodedToken = await adminAuth.verifyIdToken(token).catch((error) => {
      handleError("Invalid token");
    });

    return decodedToken.uid;
  }

  if (requireAuth) {
    handleError("Authorization required");
  }
  return null;
};
