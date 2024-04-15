import { Router } from "express";
import Container from "typedi";

import { AccountController, TransactionController } from "../controllers";
import { authorizationMiddleware } from "../middleware/checkJwt";
import { validationMiddleware } from "../middleware/validation";
import Transansaction from "./transactions"

import {  SigninDto, SignupDto } from "../types";

const accountController = Container.get(AccountController);
const transactionController = Container.get(TransactionController)
const router = Router();

router.use('/transactions',authorizationMiddleware, Transansaction)

router.post("/login", validationMiddleware(SigninDto, "body"), accountController.login);
router.post("/register", validationMiddleware(SignupDto, "body"), accountController.register);

router.get("/balance",authorizationMiddleware, transactionController.getBalance)


export default router;
