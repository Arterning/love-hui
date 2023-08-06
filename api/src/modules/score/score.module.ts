import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { ScoreHistory } from './entities/score.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ScoreHistory])],
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoreModule {}
