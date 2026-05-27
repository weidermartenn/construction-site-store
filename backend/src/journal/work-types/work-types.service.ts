import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database';
import { CreateWorkTypeDto, ReadManyWorkTypesDto } from './dto';
import { ReadWorkTypesMapper } from './mappers';
import { randomUUID } from 'crypto';

@Injectable()
export class WorkTypesService {
  private readonly mapper = new ReadWorkTypesMapper();

  constructor(private readonly prisma: PrismaService) {}

  async getWorkTypes(): Promise<ReadManyWorkTypesDto> {
    const count = await this.prisma.workType.count();

    const data = await this.prisma.workType.findMany({
      orderBy: { name: 'asc' },
    });

    return this.mapper.mapAll(data, count);
  }

  async create(data: CreateWorkTypeDto): Promise<string> {
    await this.checkName(data.name);

    const { id } = await this.prisma.workType.create({
      data: { ...data, id: randomUUID() },
    });

    return id;
  }

  async update(workTypeId: string, data: CreateWorkTypeDto): Promise<void> {
    await this.checkName(data.name, workTypeId);

    await this.prisma.workType.update({
      where: { id: workTypeId },
      data,
    });
  }

  async delete(workTypeId: string): Promise<void> {
    await this.prisma.workType.delete({
      where: { id: workTypeId },
    });
  }

  private async checkName(name: string, workTypeId?: string): Promise<void> {
    const id = workTypeId ? { not: workTypeId } : undefined;

    const existingOne = await this.prisma.workType.findFirst({
      where: {
        name: { equals: name, mode: 'insensitive' },
        id,
      },
    });

    if (existingOne) {
      throw new ConflictException(`Тип работ ${name} уже существует.`);
    }
  }
}
