export class CreateReviewDto {
  employeeId: number;
  pending: boolean;
  reviewerId: number;
  text: string;
  score: number;
}
export class ListAllEntities {
  limit: number;
}
export class UpdateReviewDto {
  employeeId: number;
  pending: boolean;
  reviewerId: number;
  text: string;
  score: number;
}
