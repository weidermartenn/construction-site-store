import { WorkLog } from 'src/generated/prisma';
import { ReadWorkLogDto, ReadManyWorkLogsDto } from '../work-logs/dto';
export class ReadWorkLogsMapper {
  public mapOne(workLog: WorkLog): ReadWorkLogDto {
    return {
      id: workLog.id,
      date: workLog.date,
      workTypeId: workLog.workTypeId,
      volume: workLog.volume,
      executor: workLog.executor,
      createdAt: workLog.createdAt,
      updatedAt: workLog.updatedAt,
    };
  }

  public mapAll(data: WorkLog[], count: number): ReadManyWorkLogsDto {
    return {
      count,
      data: data.map((one) => this.mapOne(one)),
    };
  }
}
