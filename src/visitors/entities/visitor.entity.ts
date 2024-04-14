import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Visitor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column({ type: 'timestamp', nullable: true })
  leftAt: string;

  @Column({ type: 'timestamp', nullable: true })
  enteredAt: string;
}
