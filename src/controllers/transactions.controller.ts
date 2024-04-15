import { Response, Request, NextFunction } from "express";
import { Service } from "typedi";

import { TransactionService } from "../services";

@Service()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.transactionService.createTransaction(req.jwtPayload.id, req.body, next);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  getAllTransactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.transactionService.getAllTransactions(req.jwtPayload.id, next);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  getBalance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.transactionService.getBalance(req.jwtPayload.id, next);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

}
