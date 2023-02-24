import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsArray,
  IsOptional,
} from 'class-validator';
import { CreateOptionDto } from 'src/options/dtos';

export class CreateQuestionsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  options: CreateOptionDto[];

  @ApiProperty()
  @IsOptional()
  isMandatory: boolean = false;
}
