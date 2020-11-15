import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { ReviewsController } from './reviews/reviews.controller';
import { ReviewsService } from './reviews/reviews.service';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    EmployeesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'paypay_test_dh_db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    EmployeesModule,
    ReviewsModule,
  ],
  controllers: [AppController, ReviewsController],
  providers: [AppService, ReviewsService],
})
export class AppModule {}
