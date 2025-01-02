import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateWrittenEntryDto {
  @IsInt()
  @IsOptional()
  userId?: number;

  @IsString()
  @IsOptional()
  content?: string;
}
