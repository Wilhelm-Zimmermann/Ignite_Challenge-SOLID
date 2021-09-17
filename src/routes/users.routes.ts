import { Router } from "express";

import { createUserController } from "../modules/users/useCases/createUser";
import { listAllUsersController } from "../modules/users/useCases/listAllUsers";
import { showUserProfileController } from "../modules/users/useCases/showUserProfile";
import { turnUserAdminController } from "../modules/users/useCases/turnUserAdmin";

const usersRoutes = Router();

const getUserId = (request, response, next) => {
  const { user_id } = request.headers;

  if(!user_id){
    return response.status(400).json({ error : "Id must be value" });
  }

  request.user_id = user_id
  next()
}

usersRoutes.post("/", (request, response) =>
  createUserController.handle(request, response)
);

usersRoutes.patch("/:user_id/admin", (request, response) =>
  turnUserAdminController.handle(request, response)
);

usersRoutes.get("/:user_id", (request, response) =>
  showUserProfileController.handle(request, response)
);

usersRoutes.get("/", getUserId ,(request, response) =>
  listAllUsersController.handle(request, response)
);

export { usersRoutes };
