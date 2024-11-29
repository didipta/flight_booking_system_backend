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

const searchFlights = async (
  origin: string,
  date: string,
  destination: string
): Promise<IFlight[] | null> => {
  const isValidDate = (dateString: string) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  const query = [];
  const originSearch = origin.trim().replace(/^"|"$/g, "");
  const destinationSearch = destination.trim().replace(/^"|"$/g, "");
  const dateSearch = date.trim().replace(/^"|"$/g, "");

  if (originSearch && destinationSearch) {
    // Add regex conditions
    query.push(
      { origin: { $regex: originSearch, $options: "i" } },
      { destination: { $regex: destinationSearch, $options: "i" } }
    );

    // Add date condition if search is a valid date
    if (isValidDate(date)) {
      const startDate = new Date(dateSearch);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1);

      query.push({
        date: {
          $gte: startDate,
          $lt: endDate,
        },
      });
    }
  }

  const result = await Flight.find({
    $and: query,
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
