import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review as ReviewEntity } from './review.entity';
import { Review } from './review.interface';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewsRepository: Repository<Review>,
  ) {}

  async findAll(query): Promise<Review[]> {
    const sql = query.reviewerId
      ? {
          relations: ['employee', 'reviewer'],
          where: { reviewerId: query.reviewerId },
        }
      : { relations: ['employee', 'reviewer'] };

    return this.reviewsRepository.find(sql);
  }

  async findOne(id: string): Promise<Review> {
    return this.reviewsRepository.findOne(id);
  }
  async create(review: Review) {
    return this.reviewsRepository.save(review);
  }
  async update(id: number, review: Review) {
    return this.reviewsRepository.save({ ...review, id: Number(id) });
  }
  async remove(id: string): Promise<void> {
    await this.reviewsRepository.delete(id);
  }
}
