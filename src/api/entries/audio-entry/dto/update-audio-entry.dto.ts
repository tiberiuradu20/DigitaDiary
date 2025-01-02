import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateAudioEntryDto {
  @IsInt()
  @IsOptional()
  userId?: number;

  @IsString()
  @IsOptional()
  fileUrl?: string;

  @IsInt()
  @IsOptional()
  duration?: number;
}
