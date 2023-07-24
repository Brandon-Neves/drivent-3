import { prisma } from '@/config';

async function getRoomId(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId,
    },
  });
}

async function getAllHotelId(hotelId: number) {
  return prisma.room.findMany({
    where: {
      hotelId,
    },
  });
}

const roomRepository = {
  getRoomId,
  getAllHotelId,
};

export default roomRepository;
