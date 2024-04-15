import { Response, Request, NextFunction } from "express";
import { Service } from "typedi";

import { AccountService } from "../services";

@Service()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.accountService.login(req.body, next);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.accountService.register(req.body, next);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

}
