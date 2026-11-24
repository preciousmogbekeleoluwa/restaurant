import { Router, Request, Response } from 'express';
import { db } from '../db';

export const reservationsRouter = Router();

// GET /api/reservations - List all reservations
reservationsRouter.get('/', (_req: Request, res: Response) => {
  try {
    const reservations = db.getReservations();
    res.json({
      success: true,
      count: reservations.length,
      data: reservations
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve reservations', error });
  }
});

// GET /api/reservations/:id - Get reservation by reference
reservationsRouter.get('/:id', (req: Request, res: Response) => {
  try {
    const resv = db.getReservationById(req.params.id);
    if (!resv) {
      return res.status(404).json({
        success: false,
        message: `Reservation reference ${req.params.id} not found.`
      });
    }
    res.json({ success: true, data: resv });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve reservation', error });
  }
});

// POST /api/reservations - Create new table reservation
reservationsRouter.post('/', (req: Request, res: Response) => {
  try {
    const {
      guestName,
      email,
      phone,
      date,
      timeSlot = '7:30 PM',
      guestsCount = 2,
      seatingArea = 'Main Dining Hall',
      occasion = 'Celebration / Romantic Dinner',
      specialRequests = ''
    } = req.body;

    if (!guestName || !email || !phone || !date) {
      return res.status(400).json({
        success: false,
        message: 'guestName, email, phone, and date are required fields'
      });
    }

    const reservation = db.createReservation({
      guestName: guestName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      date,
      timeSlot,
      guestsCount: Number(guestsCount) || 2,
      seatingArea,
      occasion,
      specialRequests
    });

    res.status(201).json({
      success: true,
      message: 'Table reservation successfully confirmed at Pretodan Restaurant!',
      data: reservation
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to book table reservation', error });
  }
});
