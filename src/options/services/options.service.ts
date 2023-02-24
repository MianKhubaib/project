import { NotFoundException, Injectable } from '@nestjs/common';
import { CreateOptionDto, UpdateOptionDto } from '../dtos';
import { Option } from '../models/option.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/questions/models/question.model';

@Injectable()
export class OptionsService {
  constructor(@InjectRepository(Option) private repo: Repository<Option>) {}

  //***** Create Many Options ******//
  async createManyOptions(options: CreateOptionDto[], question: Question) {
    options.map(async (option, i) => {
      try {
        const newOption = this.repo.create(option);
        newOption['question'] = question;
        await this.repo.save(newOption);
      } catch (error) {
        throw new NotFoundException('Error while creating new option');
      }
    });
    return {
      message: 'Options created successfully',
    };
  }

  async create(option: CreateOptionDto, questionId: string) {
    option['question'] = questionId;
    const newOption = this.repo.create(option);
    return await this.repo.save(newOption);
  }

  //***** Find options by question *****//
  async findOptionsByQuestion(questionId: string) {
    const options = await this.repo.find({
      where: {
        question: {
          id: questionId,
        },
      },
    });
    return options;
  }

  //***** Find option by id *****//
  async findOptionById(id: string) {
    const option = this.repo.findOne({ where: { id } });
    if (!option) {
      throw new NotFoundException(`Option with id ${id} not found`);
    }
    return option;
  }

  //***** Update a option *****//
  async updateOption(optionId: string, option: UpdateOptionDto) {
    const updateOption = await this.findOptionById(optionId);
    if (!updateOption) {
      throw new NotFoundException(`Option with id ${optionId} not found`);
    }
    Object.assign(updateOption, option);
    return updateOption;
  }

  //***** Delete a option *****//
  async deleteOption(optionId: string) {
    const deleteOption = await this.findOptionById(optionId);
    if (!deleteOption) {
      throw new NotFoundException(`Option with id ${optionId} not found`);
    }
    return await this.repo.remove(deleteOption);
  }
}
