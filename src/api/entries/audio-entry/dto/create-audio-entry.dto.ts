import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateAudioEntryDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  fileUrl: string;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}
