import { Router } from "express";
import { PublisherController } from "../controllers/PublisherController";

const router = Router();
const controller = new PublisherController();

router.get("/", (req, res) => controller.getAll(req, res));
router.get("/:id", (req, res) => controller.getById(req, res));


export default router;