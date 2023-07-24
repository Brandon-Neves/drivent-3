import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

import { getBookingRoom, getAllBooking, updateBooking } from '@/controllers';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('', getAllBooking)
  .post('', getBookingRoom)
  .put('/:bookingId', updateBooking);

export { bookingRouter };
