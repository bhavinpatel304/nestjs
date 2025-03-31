import { IsString, IsNotEmpty,MinLength,MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  @Transform(({ value }) => value.trim()) // Trim input
  name: string;
}
