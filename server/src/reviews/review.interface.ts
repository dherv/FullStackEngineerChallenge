export interface Review {
  id?: number;
  employeeId: number;
  pending: boolean;
  reviewerId: number;
  text: string;
}
