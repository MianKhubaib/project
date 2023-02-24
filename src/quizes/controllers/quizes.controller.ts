import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateQuizDto, UpdateQuizDto } from '../dtos';
import { Quiz } from '../models/quiz.model';
import { QuizService } from '../services/quiz.service';

@ApiTags('Quizes')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return await this.quizService.createQuiz(createQuizDto);
  }

  //**** Find quiz by id *****//
  @Get('/:quizId')
  async getQuizById(@Param('quizId') quizId: string): Promise<Quiz> {
    return await this.quizService.getQuizById(quizId);
  }

  @Get()
  async getAllQuizzes() {
    return await this.quizService.getAll();
  }

  //***** Update quiz *****//
  @Put('/:quizId')
  async updateQuiz(
    @Param('quizId') quizId: string,
    @Body() updateQuizDto: UpdateQuizDto,
  ) {
    return await this.quizService.updateQuiz(quizId, updateQuizDto);
  }

  @Delete('/:quizId')
  async deleteQuiz(@Param('quizId') quizId: string) {
    return await this.quizService.deleteQuiz(quizId);
  }
}
