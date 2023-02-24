import { Question } from 'src/questions/models/question.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Question, (question) => question.quiz, {
    onDelete: 'CASCADE',
  })
  questions: Quiz[];
}
