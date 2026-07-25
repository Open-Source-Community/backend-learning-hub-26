import { Microbus } from "./types";

export const fleet: Microbus[] = [
  {
    id: 1,
    driverName: "Am Ashraf",
    route: "Mohandessin - Ramses",
    farePerSeat: 7,
    seatsAvailable: 3,
    ratings: [{ Hossam: 5 }, { Nourhan: 4 }],
  },
  {
    id: 2,
    driverName: "Am Ashraf",
    route: "Haram - Dokki",
    farePerSeat: 6,
    seatsAvailable: 5,
    ratings: [{ Sherif: 3 }],
  },
  {
    id: 3,
    driverName: "Am Ashraf",
    route: "Shubra - Tahrir",
    farePerSeat: 8,
    seatsAvailable: 0,
    ratings: [{ Hossam: 2 }, { Marwa: 5 }],
  },
  {
    id: 4,
    driverName: "Am Ashraf",
    route: "Faisal - Giza Square",
    farePerSeat: 5,
    seatsAvailable: 8,
    ratings: [],
  },
];

// Keeps track of the next id to assign, since ids are auto-generated
export let nextId = 5;

export function getNextId(): number {
  return nextId++;
}
