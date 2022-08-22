import { Socket } from "socket.io-client";

export interface AppProps{
  socket?:Socket
}
export interface User2 {
  img: string | undefined;
  userName: string,
  body: string,
  id: number,
}

export interface User {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  id?: number,
  createdAt: Date,
  updatedAt: Date,
}

export interface loginUser {
  email: string,
  password: string,
}
export interface Post {
  title: string,
  id: number,
  body: string,
  createdAt: Date,
  updatedAt: Date
}

export interface decodedJWT {
  foo: string,
  exp: number,
  iat: number
}
export interface Conversation {
  id: number,
  title: string,
  createdAt: Date,
  updatedAt: Date,
  chats: [],
  users:User[],
  messages?: Message[]

}


export interface Message {
  body: string,
  id?: number,
  createdAt: number,
  updatedAt?: Date,
  user?: User,
  conversation?: Conversation
}


