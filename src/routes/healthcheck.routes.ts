import { Router } from "express";
import { healthcheck } from "@/controllers/healthcheck.controllers";

/**
 * Router for health check endpoint.
 */
const healthcheckRouter = Router();

healthcheckRouter.route("/").get(healthcheck);

export default healthcheckRouter;
