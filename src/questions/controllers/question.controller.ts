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
import { CreateQuestionsDto, UpdateQuestionsDto } from '../dtos';

import { QuestionsService } from '../services/questions.service';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  //****** Create a Question *****//
  @Post(':quizId')
  async createQuestion(
    @Body() createQuestionsDto: CreateQuestionsDto,
    @Param('quizId') quizId: string,
  ) {
    return this.questionService.createQuestion(createQuestionsDto, quizId);
  }

  //*****  Find all questions and options *****//
  @Get(':quizId')
  async findAllQuestionsAndOptions(@Param('quizId') quizId: string) {
    return await this.questionService.getAllQuestionsAndOptions(quizId);
  }

  //****** Update question *****//
  @Put(':questionId')
  async updateQuestion(
    @Param('questionId') questionId: string,
    @Body() updateQuestionDto: UpdateQuestionsDto,
  ) {
    return this.questionService.updateQuestion(questionId, updateQuestionDto);
  }

  //****** Delete question by id *****//
  @Delete(':questionId')
  async deleteQuestion(@Param('questionId') questionId: string) {
    return this.questionService.deleteQuestion(questionId);
  }
}
