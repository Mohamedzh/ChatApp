export interface User {
  img: string | undefined;
  userName: string,
  body: string,
  id: number,
}

export interface Post {
  title: string,
  id: number,
  body: string,
  createdAt: Date,
  updatedAt: Date
}