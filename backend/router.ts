var express = require('express');
var router = express.Router();
import userRouter from "./src/users/routes"

/* users listing. */
router.use('/users', userRouter)

export default router;
