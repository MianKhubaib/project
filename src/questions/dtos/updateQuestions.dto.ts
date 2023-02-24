import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateQuestionsDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  question: string;

  @ApiProperty()
  @IsOptional()
  isMandatory: boolean = false;
}
