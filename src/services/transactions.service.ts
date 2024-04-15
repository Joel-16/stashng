import { NextFunction } from "express";
import { Service } from "typedi";

import { Account, Transaction } from "../entities";
import { CustomError } from "../utils/response/custom-error/CustomError";
import { TransactionDto } from "../types";

@Service()
export class TransactionService {
  constructor(private readonly account = Account, private readonly transaction=Transaction) {}

  async createTransaction(id: number, payload: TransactionDto, next: NextFunction) {
    const account = await this.account.findOne({ where: { id }, relations: { transactions: true }});
    if (!account) {
      return next(new CustomError(409, "Account doesn't exit"));
    }
    const transaction = await this.transaction.save({
      amount: payload.amount,
      description: payload.description,
      type: payload.type
    })
   
    account.transactions.push(transaction)
    account.save()

    return {
      message: "Transactions created successfully",
      data: transaction
    };
  }

  async getAllTransactions(id: number, next: NextFunction) {
   const transactions = await this.transaction.find({where: {account: {id}}, order: {createdAt: -1}})

   return {
    message: "Transactions retreieved successfully",
    data:transactions
   }
  }

  async getBalance(id: number, next: NextFunction) {
    const transactions = await this.transaction.find({where: {account: {id}}})

    let balance: number =0
    transactions.map((transaction)=>{
      if(transaction.type === "income"){
        balance += transaction.amount
      } else {
        balance -= transaction.amount
      }
    })

    return { 
      message: "Balance calculated successfully",
      data:{balance}
    }
  }
}
