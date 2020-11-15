export interface IReview {
  id: number;
  employeeId: number;
  pending: boolean;
  reviewerId: number;
  text: string;
  score: number;
  reviewer: IEmployee;
  employee: IEmployee;
}

export interface IEmployee {
  id: number;
  name: string;
  department: string;
  position: string;
}

export interface IRoute {
  path: string;
  title: string;
}
