import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tariff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', unsigned: true })
  startAt: number;

  @Column({ type: 'integer', unsigned: true })
  endAt: number;

  @Column({ type: 'bigint', unsigned: true })
  price: number;

  @Column({ type: 'boolean', default: false })
  default: boolean;
}
