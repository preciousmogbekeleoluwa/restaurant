import { Router, Request, Response } from 'express';
import { db } from '../db';

export const contactRouter = Router();

// GET /api/contact - View contact inquiries (admin/dashboard)
contactRouter.get('/', (_req: Request, res: Response) => {
  try {
    const messages = db.getContactMessages();
    res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve messages', error });
  }
});

// POST /api/contact - Submit contact inquiry from Contact Us page
contactRouter.post('/', (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Full Name, Email Address, and Message are required'
      });
    }

    const savedMessage = db.createContactMessage({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: (phone || '').trim(),
      subject: (subject || 'General Inquiry').trim(),
      message: message.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received by Pretodan Hospitality Concierge.',
      ticketId: savedMessage.id,
      data: savedMessage
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to submit contact message', error });
  }
});
