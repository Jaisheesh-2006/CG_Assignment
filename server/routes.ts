import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import express from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Serve static files (textures, sounds, etc.)
  app.use('/textures', express.static(path.join(process.cwd(), 'client/public/textures')));
  app.use('/sounds', express.static(path.join(process.cwd(), 'client/public/sounds')));
  app.use('/geometries', express.static(path.join(process.cwd(), 'client/public/geometries')));

  // Serve the 3D room visualization
  app.get("/room", (req, res) => {
    res.sendFile(path.join(process.cwd(), "room-visualization.html"));
  });

  const httpServer = createServer(app);

  return httpServer;
}
