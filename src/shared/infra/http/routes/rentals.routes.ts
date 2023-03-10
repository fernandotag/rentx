import { type RequestHandler, Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/createRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalByUserController();

rentalsRoutes.post(
  "/",
  ensureAuthenticated as RequestHandler,
  createRentalController.handle as RequestHandler
);

rentalsRoutes.post(
  "/devolution/:id",
  ensureAuthenticated as RequestHandler,
  devolutionRentalController.handle as RequestHandler
);

rentalsRoutes.get(
  "/user",
  ensureAuthenticated as RequestHandler,
  listRentalsByUserController.handle as RequestHandler
);

export { rentalsRoutes };
