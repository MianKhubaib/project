import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AllExceptionsFilter } from './interceptors/error.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      enableDebugMessages: true,
      forbidNonWhitelisted: true,
    }),
  );

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  // Swagger Setup
  const swaggerRoute = '/docs';

  const config = new DocumentBuilder()
    .setTitle(`${process.env.ENVIRONMENT}- Trial-Test Kiwify`)
    .setVersion('1.0')
    .build();
  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: `Kiwify`,
    swaggerOptions: {
      operationsSorter: 'alpha',
      tagsSorter: 'alpha',
    },
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerRoute, app, document, customOptions);

  const port = process.env.PORT;
  await app.listen(port, () => {
    console.log('listening on port', port);
  });
}
bootstrap();
