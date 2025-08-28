export interface IUser {
  id: string;
  handle: string;
}
export interface IUserService {
  postUserToDatabase: ({ id, handle }: IUser) => any;
  getUserFromDataBase: ({ id }: { id: string }) => any;
}
