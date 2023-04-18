import { Router } from "express";
import { makeContractFactory } from "../factory";

const router = Router()

const contractController = makeContractFactory()

router.post("/create", (req, res) => contractController.create(req, res))
router.put("/update", (req, res) => contractController.updateById(req, res))
router.get("/list", (req, res) => contractController.list(req, res))
router.get("/list-id/:idContract", (req, res) => contractController.listById(req, res))
router.delete("/delete-id/:idContract", (req, res) => contractController.deleteById(req, res))
router.get("/list-open-contract", (req, res) => contractController.listOpenContract(req, res))
router.patch("/accept-contract/:idPilot/:idContract", (req, res) => contractController.acceptContract(req, res))
router.patch("/deliver-contract/:idPilot/:idContract", (req, res) => contractController.deliverContracts(req, res))

export default router