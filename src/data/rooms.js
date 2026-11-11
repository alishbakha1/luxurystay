import { ROOM_STATUS } from '@/utils/constants'
import { getCategoryById } from './roomCategories'

const RANGES = [
  { categoryId: 'standard', from: 101, to: 115 }, // 15
  { categoryId: 'deluxe', from: 201, to: 215 }, // 15
  { categoryId: 'executive', from: 301, to: 310 }, // 10
  { categoryId: 'family', from: 401, to: 407 }, // 7
  { categoryId: 'presidential', from: 501, to: 503 }, // 3
]

// Initial demo statuses (total 50): any room not listed here is AVAILABLE (15).
const STATUS_BY_ROOM = {}
const assign = (status, numbers) => numbers.forEach((n) => { STATUS_BY_ROOM[n] = status })

assign(ROOM_STATUS.OCCUPIED, [101, 102, 105, 108, 110, 201, 203, 206, 209, 212, 301, 304, 307, 401, 404]) // 15
assign(ROOM_STATUS.BOOKED, [103, 106, 111, 202, 207, 210, 302, 305, 308, 402, 405, 501]) // 12
assign(ROOM_STATUS.RESERVED, [104, 112, 204, 213, 502]) // 5
assign(ROOM_STATUS.CLEANING, [107, 205]) // 2
assign(ROOM_STATUS.MAINTENANCE, [309]) // 1

export const INITIAL_ROOMS = RANGES.flatMap(({ categoryId, from, to }) =>
  Array.from({ length: to - from + 1 }, (_, index) => {
    const number = from + index
    return {
      id: `room-${number}`,
      number,
      categoryId,
      floor: Math.floor(number / 100),
      price: getCategoryById(categoryId).price,
      status: STATUS_BY_ROOM[number] ?? ROOM_STATUS.AVAILABLE,
    }
  }),
)
