import { Injectable } from '@nestjs/common';
import { ReadWorkLogsMapper } from '../mappers';
import { PrismaService } from 'src/database';
import {
  CreateWorkLogDto,
  ReadManyWorkLogsDto,
  ReadManyWorkLogsQueryDto,
} from './dto';
import { Prisma } from 'src/generated/prisma';
import { randomUUID } from 'crypto';

@Injectable()
export class WorkLogsService {
  private readonly mapper = new ReadWorkLogsMapper();

  constructor(private readonly prisma: PrismaService) {}

  async getWorkLogs(
    query: ReadManyWorkLogsQueryDto,
  ): Promise<ReadManyWorkLogsDto> {
    const where: Prisma.WorkLogWhereInput = {};

    if (query.dateFrom) {
      where.date = { ...(where.date as object), gte: query.dateFrom };
    }

    if (query.dateTo) {
      where.date = { ...(where.date as object), lte: query.dateTo };
    }

    const count = await this.prisma.workLog.count({ where });

    const data = await this.prisma.workLog.findMany({
      take: query.take,
      skip: query.skip,
      where,
      orderBy: { createdAt: 'desc' },
    });

    return this.mapper.mapAll(data, count);
  }

  async create(data: CreateWorkLogDto): Promise<string> {
    const { id } = await this.prisma.workLog.create({
      data: { ...data, id: randomUUID() },
    });

    return id;
  }

  async update(workLogId: string, data: CreateWorkLogDto): Promise<void> {
    await this.prisma.workLog.update({
      where: { id: workLogId },
      data,
    });
  }

  async delete(workLogId: string): Promise<void> {
    await this.prisma.workLog.delete({ where: { id: workLogId } });
  }
}
