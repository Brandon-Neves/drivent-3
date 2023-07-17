import { AuthenticatedRequest } from '@/middlewares';
import hotelsServices from '@/services/hotels-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const hotels = await hotelsServices.getHotels(userId);
    return res.send(hotels);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND);
    } else if (error.name === 'HotelsError') {
      return res.status(httpStatus.PAYMENT_REQUIRED).send(console.log(error));
    } else {
      return res.status(httpStatus.BAD_REQUEST).send(console.log(error));
    }
  }
}

export async function getHotelsRooms(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { hotelId } = req.params;
  try {
    const hotels = await hotelsServices.getHotelsRooms(Number(hotelId), userId);
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND);
    } else if (error.name === 'HotelsError') {
      return res.status(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
