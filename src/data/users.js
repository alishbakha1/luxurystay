// ⚠️ DEMO ONLY. Plain-text passwords exist solely for the MOCK login.
// A real backend never sends or stores plain-text passwords (hash with bcrypt on the server).
// Delete this file when VITE_USE_MOCK_API is permanently false.
export const DEMO_USERS = [
  { id: 'usr-001', name: 'Hassan Raza', email: 'admin@luxurystay.pk', password: 'Admin@123', role: 'admin', phone: '0300 1112233', title: 'System Administrator' },
  { id: 'usr-002', name: 'Sana Malik', email: 'manager@luxurystay.pk', password: 'Manager@123', role: 'manager', phone: '0301 2223344', title: 'General Manager' },
  { id: 'usr-003', name: 'Bilal Ahmed', email: 'reception@luxurystay.pk', password: 'Reception@123', role: 'receptionist', phone: '0302 3334455', title: 'Front Desk Executive' },
  { id: 'usr-004', name: 'Rukhsana Bibi', email: 'housekeeping@luxurystay.pk', password: 'Housekeeping@123', role: 'housekeeping', phone: '0303 4445566', title: 'Housekeeping Supervisor' },
  { id: 'usr-005', name: 'Omar Siddiqui', email: 'guest@luxurystay.pk', password: 'Guest@123', role: 'guest', phone: '0304 5556677', title: 'Guest' },
]