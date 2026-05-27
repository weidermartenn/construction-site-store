import { WorkType } from 'src/generated/prisma/client';
import { ReadManyWorkTypesDto, ReadWorkTypeDto } from '../dto';
export class ReadWorkTypesMapper {
  public mapOne(workType: WorkType): ReadWorkTypeDto {
    return {
      id: workType.id,
      name: workType.name,
      unit: workType.unit,
    };
  }
  public mapAll(data: WorkType[], count: number): ReadManyWorkTypesDto {
    return {
      count,
      data: data.map((one) => this.mapOne(one)),
    };
  }
}
