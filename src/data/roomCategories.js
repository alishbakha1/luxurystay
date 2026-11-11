// Prices are plain numbers in PKR. Display via formatCurrency().
export const ROOM_CATEGORIES = [
  {
    id: 'standard',
    name: 'Standard Room',
    price: 6000,
    bedType: '1 Queen Bed',
    maxGuests: 2,
    sizeSqFt: 280,
    shortDescription: 'Comfortable, well-appointed room for the smart traveller.',
    description:
      'A calm, thoughtfully designed room with plush bedding, warm lighting and everything you need for a restful stay in the city.',
    amenities: ['Free Wi-Fi', 'Air conditioning', '42" Smart TV', 'Work desk', 'Tea & coffee maker', 'Hot shower'],
    images: ['room.avif'],
  },
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    price: 10000,
    bedType: '1 King Bed',
    maxGuests: 3,
    sizeSqFt: 360,
    shortDescription: 'Spacious comfort with a refined seating area and city views.',
    description:
      'Generous space, a king-size bed and a relaxing seating nook make the Deluxe Room ideal for longer stays or a touch of extra comfort.',
    amenities: ['Free Wi-Fi', 'Air conditioning', '50" Smart TV', 'Mini bar', 'Seating area', 'Rain shower', 'Complimentary breakfast'],
    images: ['dulx.jpg'],
  },
  {
    id: 'executive',
    name: 'Executive Suite',
    price: 16000,
    bedType: '1 King Bed + Sofa Bed',
    maxGuests: 3,
    sizeSqFt: 520,
    shortDescription: 'A separate living area and executive privileges for business and leisure.',
    description:
      'A refined suite with a separate lounge, premium bath and access to the executive lounge — designed for guests who work and unwind in style.',
    amenities: ['Free Wi-Fi', 'Separate living area', 'Executive lounge access', 'Espresso machine', 'Bathtub & rain shower', 'Mini bar', 'Complimentary breakfast'],
    images: ['executive.jpg'],
  },
  {
    id: 'family',
    name: 'Family Room',
    price: 18000,
    bedType: '2 Queen Beds',
    maxGuests: 4,
    sizeSqFt: 600,
    shortDescription: 'Generous space for the whole family, with child-friendly touches.',
    description:
      'Two queen beds, a kitchenette corner and extra living space keep the whole family comfortable, with thoughtful amenities for younger guests.',
    amenities: ['Free Wi-Fi', 'Two queen beds', 'Kitchenette', 'Kids amenities', 'Family seating area', '55" Smart TV', 'Complimentary breakfast'],
    images: ['family.avif'],
  },
  {
    id: 'presidential',
    name: 'Presidential Suite',
    price: 35000,
    bedType: '1 Super King Bed',
    maxGuests: 4,
    sizeSqFt: 1400,
    shortDescription: 'Our signature suite: panoramic views, private lounge and butler service.',
    description:
      'The pinnacle of LuxuryStay. A grand master suite with private lounge, dining area, jacuzzi and dedicated butler service, with airport transfers included.',
    amenities: ['Private lounge & dining area', 'Butler service', 'Jacuzzi', 'Panoramic view', 'Airport transfer', 'Premium mini bar', 'All-day dining credit'],
    images: ['grandview.jpg'],
  },
]

export const getCategoryById = (id) => ROOM_CATEGORIES.find((category) => category.id === id)