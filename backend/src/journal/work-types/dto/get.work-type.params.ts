import { IsUUID } from 'class-validator';

export class GetWorkTypeParams {
  @IsUUID(4)
  workTypeId!: string;
}
