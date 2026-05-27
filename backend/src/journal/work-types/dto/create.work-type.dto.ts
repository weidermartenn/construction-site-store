import { Length } from 'class-validator';

export class CreateWorkTypeDto {
  @Length(2, 250)
  name!: string;

  @Length(1, 50)
  unit!: string;
}
