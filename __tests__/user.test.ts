import jwt from "jsonwebtoken";
import { AccountService, TransactionService } from './utils/services';
import { AppDataSource } from './utils/ormconfig';
import { Account, Transaction } from "./utils/entities";

describe('User Service', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async()=>{
    await Transaction.delete({})
    await Account.delete({});
  })

  const user = { firstname: 'testuser', lastname: "tt1", email:"test@gmail.com", password: "password123"};
  let savedUser

  it('should create a user account', async () => {
    const createduser = await AccountService.register(user)
    savedUser = createduser
    expect(createduser).toBeDefined();
    expect(createduser.id).toBeDefined();
    expect(createduser.firstname).toBe('testuser');
    expect(createduser.email).toBe('test@gmail.com');
  });

  it('a user account should login', async () => {
    const authenticatedUser = await AccountService.login({email: user.email, password: user.password})
    expect(authenticatedUser).toBeDefined();
    expect(authenticatedUser.token).toBeDefined(); 
    expect(authenticatedUser.data).toBeDefined();       
  });


  it('should create a transction', async () => {
    const transaction= { amount: 4567, description: "tt", type:"income", stadium: "test stadium" };
    const createdTransction = await TransactionService.createTransaction(savedUser.id,transaction);
    expect(createdTransction).toBeDefined()
    expect(createdTransction.data.createdAt).toBeDefined()
    expect(createdTransction.data.amount).toBe(transaction.amount)
  });

  it('should get all transactions', async () => {
    const transactions = await TransactionService.getAllTransactions(savedUser.id);
    expect(Array.isArray(transactions.data)).toBe(true);
  });

  it('should get the balance of a user', async () => {
    const result = await TransactionService.getBalance(savedUser.id);
    expect(result.data.balance).toBeDefined();
    expect(result.data.balance).toBe(4567)
  });

});
