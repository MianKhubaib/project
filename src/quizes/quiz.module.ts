import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizController } from './controllers/quizes.controller';
import { Quiz } from './models/quiz.model';
import { QuizService } from './services/quiz.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz])],
  controllers: [QuizController],
  providers: [QuizService],
  exports: [QuizService],
})
export class QuizModule {}
