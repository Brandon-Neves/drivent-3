import { notFoundError } from '@/errors';
import { hotelsError } from '@/errors/hotels-error';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelsRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import enrollmentsService from '../enrollments-service';

async function findHotels(userId: number) {
  const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }

  const ticketEnrollment = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (
    !ticketEnrollment ||
    ticketEnrollment.status === 'RESERVED' ||
    !ticketEnrollment.TicketType.includesHotel ||
    ticketEnrollment.TicketType.isRemote
  ) {
    throw hotelsError();
  }
}

async function getHotels(userId: number) {
  await findHotels(userId);

  const hotels = await hotelsRepository.getHotels();

  return hotels;
}

async function getHotelsRooms(userId: number, hotelId: number) {
  await findHotels(userId);

  const hotels = await hotelsRepository.getRoomsId(hotelId);

  if (!hotels) {
    throw notFoundError();
  }
  return hotels;
}

const hotelsServices = { getHotels, getHotelsRooms };

export default hotelsServices;
