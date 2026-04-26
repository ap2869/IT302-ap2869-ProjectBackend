// Name: Alex Paguay
// Date: 02/19/2026
// Course: IT302-452
// Assignment: Phase 2 Read MongoDB data
// Email: ap2869@njit.edu
import CareersDAO from "../dao/careersDAO.js";
import OpinionsDAO from "../dao/opinionsDAO.js";


export default class CareersController {
  static async apiGetCareers(req, res, next) {
    const careersPerPage = req.query.itemsPerPage
      ? parseInt(req.query.itemsPerPage, 10)
      : 20;
    const page = req.query.pageNumber
      ? parseInt(req.query.pageNumber, 10)
      : 0;

    let filters = {};
    if (req.query.jobTitle) {
        filters.jobTitle = req.query.jobTitle;
      }

    const { careersList, totalNumCareers } = await CareersDAO.getCareers({
      filters,
      page,
      careersPerPage,
    });

    let response = {
      careers: careersList,
      page: page,
      filters: filters,
      entries_per_page: careersPerPage,
      total_results: totalNumCareers,
    };
    res.json(response);
  }

  static async apiGetCareerById(req, res, next) {
    try {
      let id = req.params.id;
      let career = await CareersDAO.getCareerById(id);
      if (!career) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      let opinions = await OpinionsDAO.getOpinionsByCareerId(id);
      career.opinions = opinions;
      res.json(career);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}