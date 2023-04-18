import { Router } from "express";
import { makeResourceFactory } from "../factory";

const router = Router()

const resourceController = makeResourceFactory()

router.post("/create", (req, res) => resourceController.create(req, res))
router.put("/update", (req, res) => resourceController.updateById(req, res))
router.get("/list", (req, res) => resourceController.list(req, res))
router.get("/list-id/:idResource", (req, res) => resourceController.listById(req, res))
router.delete("/delete-id/:idResource", (req, res) => resourceController.deleteById(req, res))

export default router