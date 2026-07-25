# ✈️ Hands-on: Airport Check-in System

### Scenario

SkyFly Airlines wants to build a simple Airport Check-in System.

As a Backend Developer, your task is to build a REST API that allows airport staff to register passengers and retrieve their information.

---

### step 1: 

* Create a new Node.js project.

### step 2: 

* Configure the project -> install the required dependencies and set up TypeScript.

### step 3: 

* Create two folders: `src` and `models`.

### step 4: 

* Inside them, create the following files:

  *  ##### src/app.ts

  *  ##### models/passenger.ts

### step 5: 

* Set up and run the Express server to ensure it works correctly.

### step 6: 

* Connect the application to MongoDB.

### step 7: 

* Define a Passenger schema/model with the following fields:

  * ##### passengerName

  * ##### flightNumber

  * ##### destination

  * ##### seatNumber

  * ##### luggageWeight

### step 8: 

* Create a POST endpoint that accepts passenger data from the request body and stores it in the database.

### step 9: 

* Test the endpoint three times using different passenger data to confirm the records are saved correctly.

### step 10: 

* Create a GET endpoint to retrieve a passenger by their ID.

### step 11: 

* Test the GET endpoint with a valid ID and verify the correct passenger is returned.

---

## Sample Data

### Passenger 1

```json
{
  "passengerName": "Ahmed Ali",
  "flightNumber": "SK101",
  "destination": "London",
  "seatNumber": "12A",
  "luggageWeight": 18,
}
```

### Passenger 2

```json
{
  "passengerName": "Sara Mohamed",
  "flightNumber": "SK205",
  "destination": "Paris",
  "seatNumber": "7C",
  "luggageWeight": 22,
}
```

### Passenger 3

```json
{
  "passengerName": "Omar Hassan",
  "flightNumber": "SK310",
  "destination": "Dubai",
  "seatNumber": "19F",
  "luggageWeight": 15,
}
```