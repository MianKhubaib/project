import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateQuestionsDto } from '../dtos';
import { CreateQuestionsDto } from '../dtos/createQuestions.dto';
import { Question } from '../models/question.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizService } from 'src/quizes/services/quiz.service';
import { OptionsService } from 'src/options/services/options.service';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question) private repo: Repository<Question>,
    private quizService: QuizService,
    private readonly optionService: OptionsService,
  ) {}

  //***** Create question *****//
  async createQuestion(createQuestionsDto: CreateQuestionsDto, quizId: string) {
    const quiz = await this.quizService.getQuizById(quizId);
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    createQuestionsDto['quiz'] = quizId;
    const question = this.repo.create(createQuestionsDto);
    await this.repo.save(question);
    console.log(question);
    if (!question) {
      throw new NotFoundException('Error while creating Question');
    }
    await this.optionService.createManyOptions(
      createQuestionsDto.options,
      question,
    );

    return question;
  }

  //***** Find all questions by quiz *****//
  async getQuestionsByQuiz(quizId: string) {
    await this.quizService.getQuizById(quizId);
    const questions = await this.repo.find({
      where: {
        quiz: {
          id: quizId,
        },
      },
    });
    if (!questions) {
      throw new NotFoundException(
        `Quiz with id ${quizId} does not have any questions`,
      );
    }
    return questions;
  }

  //***** Find all questions and options *****//
  async getAllQuestionsAndOptions(quizId: string) {
    const questions = await this.getQuestionsByQuiz(quizId);
    if (!questions) {
      throw new NotFoundException('Quiz Question not found');
    }
    const options = questions.map(async (question) => {
      const options = await this.optionService.findOptionsByQuestion(
        question.id,
      );
      return {
        ...question,
        options,
      };
    });

    return Promise.all(options);
  }

  //***** Find question by id *****//
  async getQuestionById(id: string) {
    const question = await this.repo.findOne({
      where: {
        id,
      },
    });
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    return question;
  }

  //***** Update a question *****//
  async updateQuestion(id: string, question: UpdateQuestionsDto) {
    const updatedQuestion = await this.repo.findOne({
      where: {
        id,
      },
    });
    if (!updatedQuestion) {
      throw new NotFoundException('Question not found');
    }
    Object.assign(updatedQuestion, question);
    const savedQuestion = await this.repo.save(updatedQuestion);
    return savedQuestion;
  }

  //***** Delete a question *****//
  async deleteQuestion(id: string) {
    const question = await this.repo.findOne({
      where: {
        id,
      },
    });
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    return await this.repo.remove(question);
  }
}
