export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

export const users: User[] = [
  {
    id: 1,
    username: "ًwafaa",
    email: "admin@test.com",
    password: "$2a$10$abcdefghijklmnopqrstuv",
    role: "admin",
  },
  {
    id: 2,
    username: "omnia",
    email: "user@test.com",
    password: "$2a$10$abcdefghijklmnopqrstuv",
    role: "user",
  },
];

