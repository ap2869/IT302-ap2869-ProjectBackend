// Name: Alex Paguay
// Date: 02/19/2026
// Course: IT302-452
// Assignment: Phase 2 Read MongoDB data
// Email: ap2869@njit.edu
import express from "express";
import cors from "cors";
import careers from "./api/careers.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/ap2869/careers", careers);
app.use("/{*splat}", (req, res) => res.status(404).json({ error: "not found" }));

export default app;