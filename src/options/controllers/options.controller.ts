import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOptionDto, UpdateOptionDto } from '../dtos';
import { OptionsService } from '../services/options.service';

@ApiTags('options')
@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post(':questionId')
  async createOption(
    @Body() option: CreateOptionDto,
    @Param('questionId') questionId: string,
  ) {
    return await this.optionsService.create(option, questionId);
  }

  //***** Find options by question *****//
  @Get(':questionId')
  async findOptionsByQuestion(@Param('questionId') questionId: string) {
    return await this.optionsService.findOptionsByQuestion(questionId);
  }

  //***** Update option *****//
  @Put(':optionId')
  async updateOption(
    @Param('optionId') optionId: string,
    @Body() option: UpdateOptionDto,
  ) {
    return await this.optionsService.updateOption(optionId, option);
  }

  @Delete(':optionId')
  async deleteOption(@Param('optionId') optionId: string) {
    return await this.optionsService.deleteOption(optionId);
  }
}
