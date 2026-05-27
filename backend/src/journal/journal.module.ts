import { Module } from '@nestjs/common';
import { WorkTypesController } from './work-types/work-types.controller';
import { WorkTypesService } from './work-types/work-types.service';
import { WorkLogsController } from './work-logs/work-logs.controller';
import { WorkLogsService } from './work-logs/work-logs.service';

@Module({
  controllers: [WorkTypesController, WorkLogsController],
  providers: [WorkTypesService, WorkLogsService],
})
export class JournalModule {}
