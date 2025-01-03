import { IsEmail, IsString, IsOptional } from "class-validator";

export class RegisterDto {
  @IsString()
  nume: string;

  @IsString()
  prenume: string;

  @IsEmail()
  email: string;

  @IsOptional() // Fă câmpul opțional
  @IsString()
  membershipId?: string;

  @IsString()
  parola: string;
}
