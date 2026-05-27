import { Module } from '@nestjs/common';
import { PrismaModule } from './database';
import { JournalModule } from './journal/journal.module';

@Module({
  imports: [JournalModule, PrismaModule],
})
export class AppModule {}
