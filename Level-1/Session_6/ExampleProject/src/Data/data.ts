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
    //(if you tried to sign in with this user use 123456 as password > before hashing)
    password: "$2b$10$OPvm12RhYc6mrjnQMQkvOOwrnachLB3ClkHWUrDq8FEaJNRkaiX9u",
    role: "admin",
  },
  {
    id: 2,
    username: "omnia",
    email: "omnia@test.com",
    //password = 666666  before hashing
    password: "$2b$10$9OPfojaUKN5KWkYsNgUuUecKwSCrD3y3OML3TwW9mGMadT3POQkPK",
    role: "user",
  },
];