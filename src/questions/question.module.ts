import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionsModule } from '../options/option.module';
import { QuizModule } from '../quizes/quiz.module';
import { QuestionsController } from './controllers/question.controller';
import { Question } from './models/question.model';
import { QuestionsService } from './services/questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), QuizModule, OptionsModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionModule {}
