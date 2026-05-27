import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { WorkLogsService } from './work-logs.service';
import {
  CreateWorkLogDto,
  GetWorkLogParams,
  ReadManyWorkLogsDto,
  ReadManyWorkLogsQueryDto,
} from './dto';

@Controller('work-logs')
export class WorkLogsController {
  constructor(private readonly service: WorkLogsService) {}

  @Get()
  getWorkLogs(
    @Query() query: ReadManyWorkLogsQueryDto,
  ): Promise<ReadManyWorkLogsDto> {
    return this.service.getWorkLogs(query);
  }

  @Post()
  async create(@Body() data: CreateWorkLogDto): Promise<string> {
    return this.service.create(data);
  }

  @Put(':workLogId')
  async update(
    @Param() { workLogId }: GetWorkLogParams,
    @Body() data: CreateWorkLogDto,
  ): Promise<void> {
    return this.service.update(workLogId, data);
  }

  @Delete(':workLogId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() { workLogId }: GetWorkLogParams): Promise<void> {
    return this.service.delete(workLogId);
  }
}
