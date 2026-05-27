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
} from '@nestjs/common';
import {
  CreateWorkTypeDto,
  GetWorkTypeParams,
  ReadManyWorkTypesDto,
} from './dto';
import { WorkTypesService } from './work-types.service';

@Controller('work-types')
export class WorkTypesController {
  constructor(private readonly service: WorkTypesService) {}

  @Get()
  getWorkTypes(): Promise<ReadManyWorkTypesDto> {
    return this.service.getWorkTypes();
  }

  @Post()
  async create(@Body() data: CreateWorkTypeDto): Promise<string> {
    return this.service.create(data);
  }

  @Put(':workTypeId')
  async update(
    @Param() { workTypeId }: GetWorkTypeParams,
    @Body() data: CreateWorkTypeDto,
  ): Promise<void> {
    await this.service.update(workTypeId, data);
  }

  @Delete(':workTypeId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() { workTypeId }: GetWorkTypeParams): Promise<void> {
    await this.service.delete(workTypeId);
  }
}
