import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ParkingSpace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'smallint', unsigned: true })
  width: number;

  @Column({ type: 'smallint', unsigned: true })
  length: number;

  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ type: 'boolean', default: true })
  state: boolean;
}
