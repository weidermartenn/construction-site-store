import { IsUUID } from 'class-validator';

export class GetWorkLogParams {
  @IsUUID(4)
  workLogId!: string;
}
