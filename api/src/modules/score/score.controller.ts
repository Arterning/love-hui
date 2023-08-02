import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import {AddScoreDto} from "./dto/add-score.dto";

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  create(@Body() createScoreDto: CreateScoreDto) {
    return this.scoreService.create(createScoreDto);
  }

  @Get()
  findAll() {
    return this.scoreService.findAll();
  }

  @Get('latest')
  findLatest() {
    return this.scoreService.findLatest();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('这是一个陷阱')
    return this.scoreService.findOne(+id);
  }

  @Get('chart/find')
  findChartData() {
    console.log('findChartData')
    return this.scoreService.findChartData();
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScoreDto: UpdateScoreDto) {
    return this.scoreService.update(+id, updateScoreDto);
  }

  @Post('updateTodayScore')
  updateTodayScore(@Body() addScoreDto: AddScoreDto) {
    return this.scoreService.updateTodayScore(addScoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scoreService.remove(+id);
  }
}
