import { app } from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
🍽️ =======================================================
   PRETODAN RESTAURANT — BACKEND API SERVER
=======================================================
   Server running on: http://localhost:${PORT}
   Health check:      http://localhost:${PORT}/api/health
   Menu endpoint:     http://localhost:${PORT}/api/menu
   Orders endpoint:   http://localhost:${PORT}/api/orders
   Reservations:      http://localhost:${PORT}/api/reservations
   Reviews:           http://localhost:${PORT}/api/reviews
   Contact inquiries: http://localhost:${PORT}/api/contact
=======================================================
  `);
});
