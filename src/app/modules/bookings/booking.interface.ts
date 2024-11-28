import { Types } from "mongoose";

export type IBooking = {
    userId: Types.ObjectId; // Reference to User collection
    flightId: Types.ObjectId; // Reference to Flight collection
    numberOfSeats: number;
    totalPrice: number;
    bookingStatus: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  };