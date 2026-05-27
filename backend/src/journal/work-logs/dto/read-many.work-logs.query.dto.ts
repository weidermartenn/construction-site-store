import { IsDate, IsInt, IsOptional, Max, Min } from 'class-validator';

const MAX_PAGE_SIZE = 50;

export class ReadManyWorkLogsQueryDto {
  @IsOptional()
  @IsDate()
  dateFrom?: Date;

  @IsOptional()
  @IsDate()
  dateTo?: Date;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(MAX_PAGE_SIZE)
  pageSize: number = MAX_PAGE_SIZE;

  @IsOptional()
  @IsInt()
  @Min(1)
  pageNumber: number = 1;

  get take(): number {
    return this.pageSize;
  }

  get skip(): number {
    return (this.pageNumber - 1) * this.pageSize;
  }
}
