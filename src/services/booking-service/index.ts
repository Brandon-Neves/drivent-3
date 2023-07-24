import ticketsRepository from '@/repositories/tickets-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import bookingRepository from '@/repositories/booking-repository';
import { notFoundError } from '@/errors';
import { badRequestError } from '@/errors/bad-request-error';
import { cannotBookError } from '@/errors/canot-book-error';
import roomRepository from '@/repositories/room-repository';

async function checkTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw cannotBookError();
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === 'RESERVED' || !ticket.TicketType.includesHotel || ticket.TicketType.isRemote) {
    throw cannotBookError();
  }
}

async function getBooking(userId: number) {
  const booking = await bookingRepository.getUserId(userId);

  if (!booking) throw notFoundError();
  return booking;
}

async function checkBooking(roomId: number) {
  const room = await roomRepository.getRoomId(roomId);

  const booking = await bookingRepository.getRoomId(roomId);

  if (!room) throw notFoundError();
  if (room.capacity <= booking.length) throw cannotBookError();
}

async function bookingRoomId(roomId: number, userId: number) {
  if (!roomId) throw badRequestError();

  await checkBooking(roomId);
  await checkTicket(userId);

  return bookingRepository.create({ roomId, userId });
}

async function updateBookingRoomId(roomId: number, userId: number) {
  if (!roomId) throw badRequestError();

  await checkBooking(roomId);

  const booking = await bookingRepository.getUserId(userId);

  if (booking.userId !== userId || !booking) throw cannotBookError();

  return bookingRepository.putchBooking({
    id: booking.id,
    userId,
    roomId,
  });
}

const bookingService = {
  checkTicket,
  bookingRoomId,
  getBooking,
  updateBookingRoomId,
  checkBooking,
};

export default bookingService;
