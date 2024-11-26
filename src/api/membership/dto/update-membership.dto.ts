import { IsEnum, IsNumber, IsOptional } from "class-validator";
import {TipMembership } from "@prisma/client";

export class UpdateMembershipDto {

  @IsEnum(TipMembership)
  @IsOptional()
  tipMembership?:  TipMembership

  @IsNumber()
  @IsOptional()
  nr_maxim_intrari_Scrise?: number
  
  @IsNumber()
  @IsOptional()
  nr_maxim_intrari_Audio?: number
}
