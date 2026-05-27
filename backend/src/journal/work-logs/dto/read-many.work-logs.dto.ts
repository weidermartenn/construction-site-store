import { ReadWorkLogDto } from './read.work-log.dto';

export class ReadManyWorkLogsDto {
  count!: number;
  data!: ReadWorkLogDto[];
}
