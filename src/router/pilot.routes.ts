import { Router } from "express";
import { makePilotFactory } from "../factory";

const router = Router()

const pilotControllers = makePilotFactory()

router.post("/create", (req, res) => pilotControllers.create(req, res))
router.put("/update", (req, res) => pilotControllers.updateById(req, res))
router.get("/list", (req, res) => pilotControllers.list(req, res))
router.get("/list-id/:idPilot", (req, res) => pilotControllers.listById(req, res))
router.delete("/delete-id/:idPilot", (req, res) => pilotControllers.deleteById(req, res))

export default router