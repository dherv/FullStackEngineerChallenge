export class CreateReviewDto {
  employeeId: number;
  pending: boolean;
  reviewerId: number;
  text: string;
}
export class ListAllEntities {
  reviewerId: number;
}
export class UpdateReviewDto {
  employeeId: number;
  pending: boolean;
  reviewerId: number;
  text: string;
}
