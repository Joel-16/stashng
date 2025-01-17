import { IsDate, IsEmail, IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";


export type JwtPayload = {
  id: number;
};

export class SigninDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;
}

export class TransactionDto {
  @IsNumber({maxDecimalPlaces: 2})
  amount: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsIn(["income", "expense"])
  type: string;

}
