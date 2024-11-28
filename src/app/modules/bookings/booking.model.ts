import { model, Schema } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      flightId: {
        type: Schema.Types.ObjectId,
        ref: 'Flight',
        required: true,
      },
      numberOfSeats: {
        type: Number,
        required: true,
        min: 1,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
      bookingStatus: {
        type: String,
        enum: ['CONFIRMED', 'PENDING', 'CANCELLED'],
        default: 'PENDING',
        required: true,
      },
    },
    {
      timestamps: true,
      toJSON: {
        virtuals: true,
      },
    }
  );
  
  export const Booking = model<IBooking>('Booking', bookingSchema);