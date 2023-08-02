import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import {ScoreHistory} from "./entities/score.entity";
import {InjectRepository} from "@nestjs/typeorm";
import { DataSource, Repository } from 'typeorm';
import {AddScoreDto} from "./dto/add-score.dto";
import {DataPoint} from "./type";

type GroupedByClass = {
  [pid: string]: ScoreHistory[];
};

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

  async findChartData() {
    const data = await this.findAll()
    const group :GroupedByClass = this.groupData(data)
    const chartData = {}
    console.log(group)
    Object.entries(group).forEach(([pid,items]) => {
      const list: DataPoint[] = items.map(({date, score}) => ([new Date(date).getTime(), score]))
      console.log(list)
      chartData[pid] = list
    })
    console.log(chartData)
    return chartData
  }



  groupData(items: ScoreHistory[]) {
    return items.reduce((result, item) => {
      const { partnerId } = item;
      if (!result[partnerId]) {
        result[partnerId] = [];
      }
      result[partnerId].push(item);
      return result;
    }, {});
  }


  findOne(id: number) {
    // return `This action returns a #${id} score`;
    return this.scoreHistoryRepository.findOne({
      where: {
        id
      }
    })
  }


  async update(id: number, updateScoreDto: UpdateScoreDto) {
    // return `This action updates a #${id} score`;
    const score = await this.scoreHistoryRepository.preload({
      id,
      ...updateScoreDto
    })
    if (!score) {
      return new NotFoundException(`Score #${id} not found`);
    }
    return this.scoreHistoryRepository.save(score)
  }


  remove(id: number) {
    return `This action removes a #${id} score`;
  }

  async updateTodayScore(addScoreDto: AddScoreDto) {
    console.log(addScoreDto)
    const entity = await this.scoreHistoryRepository.findOne({
      where: {
        partnerId: addScoreDto.partnerId,
        date: addScoreDto.date
      },
    })
    if (!entity) {
      return new NotFoundException(`Score not found`);
    }
    //由于没有使用Pipe 导致这里接受到的是字符串 而不是number
    const score = parseInt(String(addScoreDto.add)) + entity.score
    console.log(score)
    console.log('增加积分', entity)
    entity.score = score
    return this.scoreHistoryRepository.save(entity)
  }

    findLatest() {
      // 获取当前日期，不包括时分秒
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 将时分秒设为0，只保留日期部分
      return this.scoreHistoryRepository.find({
        where: {
          date: today
        }
      })
    }

}
