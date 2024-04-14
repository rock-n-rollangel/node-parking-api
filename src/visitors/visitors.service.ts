import { Injectable } from '@nestjs/common';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { Visitor } from './entities/visitor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VisitorsService {
  constructor(
    @InjectRepository(Visitor)
    private visitorsRepository: Repository<Visitor>,
  ) {}

  create(createVisitorDto: CreateVisitorDto) {
    const visitor = new Visitor();
    visitor.number = createVisitorDto.number;
    visitor.enteredAt = new Date().toString();

    this.visitorsRepository.save(visitor);

    return visitor;
  }

  findAll() {
    return this.visitorsRepository.find();
  }

  findOne(id: number) {
    return this.visitorsRepository.findOneBy({ id: id });
  }

  leave(id: number) {
    return this.visitorsRepository.update(
      { id: id },
      { leftAt: new Date().toString() },
    );
  }

  update(id: number, updateVisitorDto: UpdateVisitorDto) {
    return this.visitorsRepository.update({ id: id }, updateVisitorDto);
  }

  remove(id: number) {
    return this.visitorsRepository.delete({ id: id });
  }
}
