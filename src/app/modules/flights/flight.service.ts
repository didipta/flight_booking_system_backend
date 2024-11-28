import { IGenericResponse } from "../../../interfaces/error";
import { IPaginationOptions } from "../../../shared/pagination copy";
import { paginationHelpers } from "../../../shared/paginationHelper";
import { IFlight } from "./flight.interface";
import { Flight } from "./flight.model";

const creatFlight = async (payload: IFlight): Promise<IFlight | null> => {
  const result = await Flight.create(payload);
  return result;
};

const getAllFlights = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFlight[]>> => {
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await Flight.find({}).skip(skip).limit(limit);

  const total = await Flight.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const searchFlights = async (search: string): Promise<IFlight[] | null> => {
  const result = await Flight.find({
    $or: [
      { origin: { $regex: search, $options: "i" } },
      { destination: { $regex: search, $options: "i" } },
      { date: { $regex: search, $options: "i" } },
    ],
  });

  return result;
};

const getFlightById = async (id: string): Promise<IFlight | null> => {
  const result = await Flight.findById(id);
  return result;
};

const updateFlight = async (
  id: string,
  payload: IFlight
): Promise<IFlight | null> => {
  const result = await Flight.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const delectFlight = async (id: string): Promise<IFlight | null> => {
  const result = await Flight.findByIdAndDelete(id);
  return result;
};

export const FlightService = {
  creatFlight,
  getAllFlights,
  searchFlights,
  getFlightById,
    updateFlight,
    delectFlight,
    
};
