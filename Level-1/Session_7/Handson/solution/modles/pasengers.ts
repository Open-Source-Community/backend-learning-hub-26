import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema({
  passengerName: { type: String,required: true,},

  flightNumber: { type: String, required: true,},

  destination: { type: String, required: true,},

  seatNumber: { type: String, required: true,},

  luggageWeight: { type: Number, required: true,},

});

export default mongoose.model("Passenger", passengerSchema);