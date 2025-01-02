import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateWrittenEntryDto {
 
 //@IsOptional()
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}
