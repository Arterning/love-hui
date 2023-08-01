import { Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import {ScoreHistory} from "./entities/score.entity";
import {InjectRepository} from "@nestjs/typeorm";
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ScoreService {

  constructor(@InjectRepository(ScoreHistory)
              private readonly scoreHistoryRepository: Repository<ScoreHistory>) {
  }

  create(createScoreDto: CreateScoreDto) {
    const coffee = this.scoreHistoryRepository.create(createScoreDto)
    return this.scoreHistoryRepository.save(coffee)
  }

  findAll() {
    return this.scoreHistoryRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} score`;
  }

  update(id: number, updateScoreDto: UpdateScoreDto) {
    return `This action updates a #${id} score`;
  }

  remove(id: number) {
    return `This action removes a #${id} score`;
  }

}
