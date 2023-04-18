import { Router } from "express";
import { makeReportFactory } from "../factory";

const router = Router()

const reportsController = makeReportFactory()

router.get("/transaction", (req, res) => reportsController.transaction(req, res))
router.get("/weight-supplies-planet-report", (req, res) => reportsController.weightSuppliesPlanetReport(req, res))
router.get("/percentage-resources-pilot", (req, res) => reportsController.percentageResourcesByPilot(req, res))

export default router