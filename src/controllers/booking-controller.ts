import httpStatus from 'http-status';
import bookingService from '@/services/booking-service';
import { AuthenticatedRequest } from '@/middlewares';
import { Response, NextFunction } from 'express';

export async function getAllBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const booking = await bookingService.getBooking(userId);
    return res.status(httpStatus.OK).send({
      id: booking.id,
      Room: booking.Room,
    });
  } catch (error) {
    next(error);
  }
}

export async function getBookingRoom(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const { roomId } = req.body as Record<string, number>;
    const booking = await bookingService.bookingRoomId(userId, roomId);

    return res.status(httpStatus.OK).send({
      bookingId: booking.id,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const bookingId = Number(req.params.bookingId);
  if (!bookingId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const { roomId } = req.body as Record<string, number>;
    const booking = await bookingService.updateBookingRoomId(userId, roomId);

    return res.status(httpStatus.OK).send({
      bookingId: booking.id,
    });
  } catch (error) {
    next(error);
  }
}
