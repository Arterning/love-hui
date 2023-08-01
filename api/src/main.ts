import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import {NestExpressApplication} from "@nestjs/platform-express";
import {TransformInterceptor} from "./modules/common/transform.interceptor";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor()); // 正常情况下，响应值统一
  app.useStaticAssets(join(__dirname, '../uploads'), {prefix: '/uploads'});
  app.setGlobalPrefix('/content');
  await app.listen(3000, "0.0.0.0");

}
bootstrap();
