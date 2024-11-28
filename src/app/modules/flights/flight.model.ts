import { model, Schema } from "mongoose";
import { IFlight } from "./flight.interface";

const flightSchema = new Schema<IFlight>(
    {
      flightNumber: {
        type: String,
        required: true,
        unique: true,
      },
      airline: {
        type: String,
        required: true,
      },
      origin: {
        type: String,
        required: true,
      },
      destination: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      availableSeats: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    {
      timestamps: true,
      toJSON: {
        virtuals: true,
      },
    }
  );
  
  export const Flight = model <IFlight>('Flight', flightSchema);