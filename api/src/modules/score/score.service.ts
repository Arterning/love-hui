import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateScoreDto} from './dto/create-score.dto';
import {UpdateScoreDto} from './dto/update-score.dto';
import {ScoreHistory} from "./entities/score.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from 'typeorm';
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
      const latest = await this.findLatest()
      console.log(latest)
      const found = latest.find(e => e.partnerId === addScoreDto.partnerId)
      console.log('@@', found)
      if (!found) {
        return
      }
      const createScoreDto: CreateScoreDto = {
        date: addScoreDto.date,
        partnerId: addScoreDto.partnerId,
        score: found.score + parseInt(String(addScoreDto.add))
      }
      return await this.create(createScoreDto)
    } else {
      //由于没有使用Pipe 导致这里接受到的是字符串 而不是number
      const score = parseInt(String(addScoreDto.add)) + entity.score
      console.log('update score',score)
      entity.score = score
      return this.scoreHistoryRepository.save(entity)
    }
  }

    async findLatest() : Promise<ScoreHistory[]> {
      const maxDateRecord = await this.scoreHistoryRepository
          .createQueryBuilder('scoreHistory')
          .orderBy('scoreHistory.date', 'DESC') // 按日期字段降序排序
          .getOne();
      const maxDate = maxDateRecord.date
      return await this.scoreHistoryRepository
          .createQueryBuilder('score_history')
          .where('score_history.date = :maxDate', {maxDate: maxDate})
          .andWhere('score_history.partnerId IN (:...partnerIds)', {partnerIds: [1, 2]})
          .getMany()
    }

}
