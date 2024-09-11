export interface UserRepositoryResponseOnSuccessTrue {
  success: boolean;
  message: string;
  data: any;
}

export interface UserRepositoryResponseOnSuccessFalse {
  success: boolean;
  message: string;
}

export type UserRepositoryResponse =
  | UserRepositoryResponseOnSuccessFalse
  | UserRepositoryResponseOnSuccessTrue;
