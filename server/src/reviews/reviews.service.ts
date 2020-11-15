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

  async findAll(): Promise<Review[]> {
    return this.reviewsRepository.find({ relations: ['employee', 'reviewer'] });
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
