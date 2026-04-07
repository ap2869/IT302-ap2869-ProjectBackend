// Name: Alex Paguay
// Date: 02/19/2026
// Course: IT302-452
// Assignment: Phase 2 Read MongoDB data
// Email: ap2869@njit.edu
import { ObjectId } from "mongodb";

let careers;

export default class CareersDAO {
    static async injectDB(conn) {
        if (careers) {
            return;
        }
        try {
            careers = await conn
                .db(process.env.CAREERS_NS)
                .collection("Careers_ap2869");
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in careersDAO: ${e}`
            );
        }
    }

    static async getCareers({ filters = null, page = 0, careersPerPage = 20 } = {}) {
        let query = {};
        if (filters) {
            if ("jobTitle" in filters) {
                query = { jobTitle: { $regex: filters["jobTitle"], $options: "i" } };
              }
        }

        let cursor;

        try {
            cursor = await careers.find(query).project({ jobDescription: 0, jobSlug: 0, url: 0, jobExcerpt: 0 });

        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { careersList: [], totalNumCareers: 0 };
        }

        const displayCursor = cursor
            .limit(careersPerPage)
            .skip(careersPerPage * page);

        try {
            const careersList = await displayCursor.toArray();
            const totalNumCareers = await careers.countDocuments(query);
            return { careersList, totalNumCareers };
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            );
            return { careersList: [], totalNumCareers: 0 };
        }
    }

    static async getCareerById(id) {
        try {
            return await careers.findOne({ _id: new ObjectId(id) });
        } catch (e) {
            console.error(`Unable to get career by id: ${e}`);
            return null;
        }
    }
}