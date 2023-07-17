import { prisma } from '@/config';

async function getHotels() {
  return prisma.hotel.findMany();
}

async function getRoomsId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

const hotelsRepository = {
  getHotels,
  getRoomsId,
};

export default hotelsRepository;
