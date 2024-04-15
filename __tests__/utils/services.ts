import { compareSync, hashSync } from 'bcryptjs';
import jwt from "jsonwebtoken";
import { Account, Transaction } from './entities';

export class AccountService {
    static async register(payload) {
        const account = await Account.save({
            email: payload.email,
            password: hashSync(payload.password, 10),
            firstname: payload.firstname,
            lastname: payload.lastname
        });

        return account
    }

    static async login(payload) {
        const account = await Account.findOne({
            where: { email: payload.email },
            select: ['password', 'id', 'firstname'],
          });
        if (!account || !compareSync(payload.password, account.password)) {
            return { message: "invalid credentials" }
        }

        return {
            token: jwt.sign({ id: account.id }, "sfdfgfhgsa"),
            data: account
        };
    }

}

export class TransactionService {
  
    static async createTransaction(id: number, payload) {
      const account = await Account.findOne({ where: { id }, relations: { transactions: true }});

      const transaction = await Transaction.save({
        amount: payload.amount,
        description: payload.description,
        type: payload.type
      })
     
      account?.transactions.push(transaction)
      account?.save()
  
      return {
        message: "Transactions created successfully",
        data: transaction
      };
    }
  
    static async getAllTransactions(id: number) {
     const transactions = await Transaction.find({where: {account: {id}}, order: {createdAt: -1}})
  
     return {
      message: "Transactions retreieved successfully",
      data:transactions
     }
    }
  
    static async getBalance(id: number) {
      const transactions = await Transaction.find({where: {account: {id}}})
  
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