import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Question } from './questions/models/question.model';
import { Quiz } from './quizes/models/quiz.model';
import { QuestionModule } from './questions/question.module';
import { QuizModule } from './quizes/quiz.module';
import { OptionsModule } from './options/option.module';
import { Option } from './options/models/option.model';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './interceptors/transform.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      entities: [Option, Question, Quiz],
      synchronize: true,
      autoLoadEntities: true,
    }),
    QuestionModule,
    QuizModule,
    OptionsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
