// Name: Alex Paguay
// Date: 03/23/2026
// Course: IT302-452
// Assignment: Assignment: Phase 3 MongoDB Data using Node.js
// Email: ap2869@njit.edu
import OpinionsDAO from "../dao/opinionsDAO.js";

export default class OpinionsController {
  static async apiPostOpinion(req, res, next) {
    try {
      const careerId = req.body.careerId;
      const text = req.body.text;
      const userName = req.body.userName;
      const userId = req.body.userId;

      const opinionResponse = await OpinionsDAO.addOpinion(
        careerId,
        text,
        userName,
        userId
      );
      res.json({ status: "success", response: opinionResponse });
    } catch (e) {
      res.status(500).json({ status: "failure", error: e.message });
    }
  }

  static async apiUpdateOpinion(req, res, next) {
    try {
      const opinionId = req.body.opinionId;
      const text = req.body.text;
      const userId = req.body.userId;

      const opinionResponse = await OpinionsDAO.updateOpinion(
        opinionId,
        text,
        userId
      );

      if (opinionResponse.modifiedCount === 0) {
        throw new Error("Unable to update opinion. User may not be the original poster.");
      }

      res.json({ status: "success", response: opinionResponse });
    } catch (e) {
      res.status(500).json({ status: "failure", error: e.message });
    }
  }

  static async apiDeleteOpinion(req, res, next) {
    try {
      const opinionId = req.body.opinionId;
      const userId = req.body.userId;

      const opinionResponse = await OpinionsDAO.deleteOpinion(
        opinionId,
        userId
      );

      res.json({ status: "success", response: opinionResponse });
    } catch (e) {
      res.status(500).json({ status: "failure", error: e.message });
    }
  }
}