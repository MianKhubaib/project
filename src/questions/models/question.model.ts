import { Option } from 'src/options/models/option.model';
import { Quiz } from 'src/quizes/models/quiz.model';

import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  question: string;

  @Column()
  isMandatory: boolean;

  @OneToMany(() => Option, (option) => option.question, { onDelete: 'CASCADE' })
  options: Option[];

  @ManyToOne(() => Quiz, (quiz) => quiz.questions, { onDelete: 'CASCADE' })
  quiz: Quiz;
}
