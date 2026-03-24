// Name: Alex Paguay
// Date: 03/23/2026
// Course: IT302-452
// Assignment: Phase 3 MongoDB Data using Node.js
// Email: ap2869@njit.edu
import { ObjectId } from "mongodb";

let opinions;

export default class OpinionsDAO {
  static async injectDB(conn) {
    if (opinions) {
      return;
    }
    try {
      opinions = await conn
        .db(process.env.CAREERS_NS)
        .collection("opinions_ap2869");
    } catch (e) {
      console.error(`Unable to establish collection handle in opinionsDAO: ${e}`);
    }
  }

  static async addOpinion(careerId, text, userName, userId) {
    try {
      const opinionDoc = {
        careerId: careerId,
        text: text,
        userName: userName,
        userId: userId,
        lastModified: new Date(),
      };
      return await opinions.insertOne(opinionDoc);
    } catch (e) {
      console.error(`Unable to post opinion: ${e}`);
      return { error: e };
    }
  }

  static async updateOpinion(opinionId, text, userId) {
    try {
      const updateResponse = await opinions.updateOne(
        { _id: new ObjectId(opinionId), userId: userId },
        { $set: { text: text, lastModified: new Date() } }
      );
      return updateResponse;
    } catch (e) {
      console.error(`Unable to update opinion: ${e}`);
      return { error: e };
    }
  }

  static async deleteOpinion(opinionId, userId) {
    try {
      const deleteResponse = await opinions.deleteOne({
        _id: new ObjectId(opinionId),
        userId: userId,
      });
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete opinion: ${e}`);
      return { error: e };
    }
  }
}