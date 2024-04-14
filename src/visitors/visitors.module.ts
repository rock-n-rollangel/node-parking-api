import { Module } from '@nestjs/common';
import { VisitorsService } from './visitors.service';
import { VisitorsController } from './visitors.controller';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Visitor } from './entities/visitor.entity';

const visitorsServiceMock = {};

@Module({
  imports: [TypeOrmModule.forFeature([Visitor])],
  controllers: [VisitorsController],
  providers: [VisitorsService],
})
export class VisitorsModule {}
