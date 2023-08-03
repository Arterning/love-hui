import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './modules/upload/upload.module';
import { ScoreModule } from './modules/score/score.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'personal_manage',
      //如何在类型的帮助下转换为数据库表和模式 也可以明确的加载单个实体 也可以说是自动加载单个实体 然后他们会为你找到这些实体文件并未你加载他们
      autoLoadEntities: true,
      // 始终保持你的数据库模式同步
      // 配合$Entity（）同步装饰器自动会根据使用的类生成一个SQL表 以及包含的元数据--节省了大量去手动编码
      //⭐还有请记住这个仅用于开发模式
      synchronize: true,
      logging: true, // 启用查询日志

    }),
    UploadModule, ScoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
