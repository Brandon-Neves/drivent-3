import { notFoundError } from '@/errors';
import { cannotListHotelsError } from '@/errors/hotels-error';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelsRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import enrollmentsService from '../enrollments-service';
import ticketService from '../tickets-service';

async function findAllHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }

  const ticketEnrollment = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  const ticket = await ticketService.getTicketByUserId(userId);
  if (!ticket) throw notFoundError();

  if (ticket.status !== 'PAID') throw Error('PaymentRequired');

  const hotels = await hotelsRepository.findHotels();
  if (!hotels || !hotels[0]) throw notFoundError();

  return hotels;
}

async function getHotels(userId: number) {
  await findAllHotels(userId);

  const hotels = await hotelsRepository.findHotels();

  return hotels;
}

async function getHotelsRooms(userId: number, hotelId: number) {
  await findAllHotels(userId);

  const hotels = await hotelsRepository.getRoomsId(hotelId);

  if (!hotels) {
    throw notFoundError();
  }
  return hotels;
}

const hotelsServices = { findAllHotels, getHotels, getHotelsRooms };

export default hotelsServices;
