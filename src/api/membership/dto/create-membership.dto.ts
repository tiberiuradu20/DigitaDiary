import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { TipMembership} from "@prisma/client";

export class CreateMembershipDto {
  @IsEnum(TipMembership)
  @IsNotEmpty()
  tipMembership:  TipMembership

  @IsNumber()
  nr_maxim_intrari_Scrise: number

  @IsNumber()
  nr_maxim_intrari_Audio: number


 
}
