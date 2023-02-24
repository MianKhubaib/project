import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto, UpdateQuizDto } from '../dtos';
import { Quiz } from '../models/quiz.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuizService {
  constructor(@InjectRepository(Quiz) private repo: Repository<Quiz>) {}

  //***** Create a Quiz *****//
  async createQuiz(createQuizDto: CreateQuizDto) {
    const quiz = this.repo.create(createQuizDto);
    await this.repo.save(quiz);
    return quiz;
  }

  //***** Find quiz by id ******//
  async getQuizById(id: string) {
    const quiz = await this.repo.findOne({ where: { id } });
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    return quiz;
  }

  async getAll() {
    return await this.repo.find();
  }

  //***** Update a quiz *****//
  async updateQuiz(quizId: string, quiz: UpdateQuizDto) {
    const updateQuiz = await this.getQuizById(quizId);
    if (!updateQuiz) {
      throw new NotFoundException('Quiz not found');
    }
    Object.assign(updateQuiz, quiz);
    return await this.repo.save(updateQuiz);
  }

  //***** Delete a quiz *****//
  async deleteQuiz(quizId: string) {
    const deleteQuiz = await this.getQuizById(quizId);
    if (!deleteQuiz) {
      throw new NotFoundException('Quiz not found');
    }
    return await this.repo.remove(deleteQuiz);
  }
}
