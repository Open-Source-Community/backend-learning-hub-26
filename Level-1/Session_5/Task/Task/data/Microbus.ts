interface Microbus {
    id: number;
    driverName: string;
    route: string;
    farePerSeat: number;
    seatsAvailable: number;
    ratings?: Array<{ name: string; rating: number }>;
    //3maltaha optional 3ashan func addnew 
}

const fleet:Microbus[]=[
    {
        id:1,
        driverName:"ahmed",
        route:"sab3",
        farePerSeat:12,
        seatsAvailable:14,
        ratings:[{name:"yass",rating:4},{name:"yousef",rating:4}]
    },
    {
        id:2,
        driverName:"mohamed",
        route:"3asher",
        farePerSeat:13,
        seatsAvailable:10,
        ratings:[{name:"tata",rating:5},{name:"osha",rating:3}]
    },
    {
        id:3,
        driverName:"ali",
        route:"rab3a",
        farePerSeat:15,
        seatsAvailable:8,
        ratings:[{name:"32osh",rating:3},{name:"habiba",rating:4}]
    }
];

export default fleet;

