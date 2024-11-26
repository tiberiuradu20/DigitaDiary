import { IsEmail, IsInt, IsOptional, IsString } from "class-validator";


export class UpdateUserDto {
  @IsOptional()
  @IsString()
  nume?: string;

  @IsOptional()
  @IsString()
  prenume?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsInt()
  membershipId?: number;
}
