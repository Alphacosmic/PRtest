// pages/api/analytics.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { action, details, timestamp } = req.body;

    try {
      await prisma.analyticsEvent.create({
        data: {
          action,
          details: JSON.stringify(details),
          timestamp: new Date(timestamp),
        },
      });

      res.status(200).json({ message: "Event logged" });
    } catch (error) {
      console.error("Analytics logging failed:", error);

      // Also store failure logs separately
      await prisma.analyticsError.create({
        data: {
          error: error.message,
          endpoint: "/api/analytics",
          timestamp: new Date(),
        },
      });

      res.status(500).json({ message: "Error logging analytics" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
