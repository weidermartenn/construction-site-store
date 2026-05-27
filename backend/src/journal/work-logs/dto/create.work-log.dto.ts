import { IsDate, IsNumber, IsString, IsUUID, Length } from 'class-validator';

export class CreateWorkLogDto {
  @IsDate()
  date!: Date;

  @IsUUID()
  workTypeId!: string;

  @IsNumber()
  volume!: number;

  @IsString()
  @Length(1, 250)
  executor!: string;
}
