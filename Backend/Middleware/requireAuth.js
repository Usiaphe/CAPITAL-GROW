import { clerkClient } from "@clerk/clerk-sdk-node";

export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No authorization header" });
    }

    const token = authHeader.replace("Bearer ", "");

    const session = await clerkClient.sessions.verifySession(token);

    req.clerkUserId = session.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}