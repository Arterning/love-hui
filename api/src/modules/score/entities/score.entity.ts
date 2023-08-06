import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('score_history')
export class ScoreHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  partnerId: string;

  @Column()
  score: number;

  @Column({
    type: 'date',
    nullable: false,
  })
  date: Date;

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'create_at',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
    name: 'update_at',
  })
  updateAt: Date;
}
