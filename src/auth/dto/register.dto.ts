import { IsEmail, IsString} from "class-validator";


export class RegisterDto {
  @IsString()
  nume: string;

  @IsString()
  prenume: string;

  @IsEmail()
  email: string;

  @IsString()
  membershipId: string;

  @IsString()
  parola: string;

}
