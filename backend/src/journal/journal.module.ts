import { Module } from '@nestjs/common';
import { WorkTypesController } from './work-types/work-types.controller';
import { WorkTypesService } from './work-types/work-types.service';

@Module({
  controllers: [WorkTypesController],
  providers: [WorkTypesService],
})
export class JournalModule {}
