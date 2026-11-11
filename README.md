# LuxuryStay Hospitality — Hotel Management System (Frontend)

React + Vite + Tailwind CSS frontend for the Aptech MERN eProject. All data is mock data kept in the browser (`localStorage`).

## Run
```
npm install
npm run dev
```

## Demo accounts (mock authentication only)
| Role | Email | Password |
|---|---|---|
| Admin | admin@luxurystay.pk | Admin@123 |
| Manager | manager@luxurystay.pk | Manager@123 |
| Receptionist | reception@luxurystay.pk | Reception@123 |
| Housekeeping | housekeeping@luxurystay.pk | Housekeeping@123 |
| Guest | guest@luxurystay.pk | Guest@123 |

Reset demo data: run `localStorage.removeItem('luxurystay.hotel.v1')` in the browser console and refresh.

## Structure
- `src/pages` — public, admin, reception, housekeeping, guest and shared pages
- `src/components` — ui, layout, common, rooms
- `src/context` — Auth, Notification and Hotel (rooms, bookings, billing settings) state
- `src/data` — mock data; `src/utils` — currency (PKR), billing, availability, validators
- `src/services` — `authService` switches mock/real auth via `VITE_USE_MOCK_API`

## Backend integration
Set `VITE_USE_MOCK_API=false` and `VITE_API_URL` to the Express API. Replace the actions in `src/context/HotelContext.jsx` with API calls. Security (password hashing, tokens, backups, encryption) belongs on the server.

All prices are in Pakistani Rupees via `formatCurrency()`.
