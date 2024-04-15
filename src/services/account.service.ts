import { compareSync, hashSync } from "bcryptjs";
import { NextFunction } from "express";
import { Service } from "typedi";

import { Account } from "../entities";
import { createJwtToken } from "../utils/createJwtToken";
import { CustomError } from "../utils/response/custom-error/CustomError";

@Service()
export class AccountService {
  constructor(private readonly account = Account) {}

  async register(payload, next: NextFunction) {
    const status = await this.account.findOne({ where: { email: payload.email } });
    if (status) {
      return next(new CustomError(401, 'Email already associated with an account'));
    }
    const account =  await this.account.save({
      email: payload.email,
      password: hashSync(payload.password, 10),
      firstname: payload.firstname,
      lastname: payload.lastname
    });

    delete account.password
    return {
      message: "signup successful, plese login to continue",
      data: account
    };
  }

  async login(payload: { email: string; password: string }, next: NextFunction) {
    const account = await this.account.findOne({
      where: { email: payload.email },
      select: ['password', 'id', 'firstname'],
    });
    if (!account || !compareSync(payload.password, account.password)) {
      next(new CustomError(400, "Invalid credentials"));
    }

    delete account.password
    return {
      message: "login successful",
      token: createJwtToken({ id: account.id}),
      data: account
    };
  }

  
}
