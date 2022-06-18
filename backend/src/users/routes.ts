import * as express from "express";
import UsersController from "./controllers/users.controller";
import { UserEntity } from "./entity/users.entity";
import { UserCreateDto } from "./controllers/dto/userCreate.dto"
var router = express.Router();
const userController = new UsersController()

/* GET users listing. */
router.get('/hello', async function(req, res, next) {
  const list: UserEntity[] = await userController.all(req, res, next);
  console.log(list);
  res.send({text: list[0].firstName});
});


/* POST users for register */
router.post('/register', userController.create);

export default router;

