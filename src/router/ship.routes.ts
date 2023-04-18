import { Router } from "express";
import { makeShipFactory } from "../factory";

const router = Router()

const shipControllers = makeShipFactory()

router.post("/create", (req, res) => shipControllers.create(req, res))
router.put("/update", (req, res) => shipControllers.updateById(req, res))
router.get("/list", (req, res) => shipControllers.list(req, res))
router.get("/list-open-ship", (req, res) => shipControllers.listOpenShip(req, res))
router.get("/list-id/:idShip", (req, res) => shipControllers.listById(req, res))
router.delete("/delete-id/:idShip", (req, res) => shipControllers.deleteById(req, res))
router.patch('/set-closed-ship', (req, res) => shipControllers.setClosedShip(req, res))
router.patch('/set-open-ship', (req, res) => shipControllers.setOpenShip(req, res))
router.patch('/fuel', (req, res) => shipControllers.fuel(req, res))
router.patch('/travels', (req, res) => shipControllers.travels(req, res))

export default router