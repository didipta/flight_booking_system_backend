# Flight Booking API

This project is a RESTful API for managing a flight booking system. It allows users to register, search for flights, book tickets, and manage bookings. Admins have additional privileges to manage flights and bookings.

---

### Admin Login

- **email**: admin@gmail.com
- **password**: admin@

### Link

- **FrontEnd**:https://flight-booking-chi-ivory.vercel.app
- **BackEnd**:https://flight-booking-system-backend-six.vercel.app/api/v1/

## Features

### User Endpoints

- **POST /api/register**: Register a new user.
- **POST /api/login**: Authenticate a user and provide a JWT token.
- **GET /api/flights**: Retrieve a list of all available flights.
- **GET /api/flights/search**: Retrieve flights based on search criteria (origin, destination, date).
- **GET /api/flights/:id**: Retrieve details of a specific flight.

### Booking Endpoints

- **POST /api/bookings**: Create a new booking for a flight (requires authentication).
- **GET /api/bookings/user/:id**: Retrieve all bookings for a specific user (requires authentication).

### Admin Endpoints

- **GET /api/bookings**: Retrieve all bookings (Admin only).
- **PUT /api/bookings/:id**: Update a booking (Admin only).
- **DELETE /api/bookings/:id**: Delete a booking (Admin only).
- **POST /api/flights**: Add a new flight (Admin only).
- **PUT /api/flights/:id**: Update flight details (Admin only).
- **DELETE /api/flights/:id**: Delete a flight (Admin only).

---
