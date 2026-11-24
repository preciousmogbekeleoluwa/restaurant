import { Router, Request, Response } from 'express';
import { db } from '../db';

export const vipRouter = Router();

// POST /api/vip/join - Join VIP loyalty program
vipRouter.post('/join', (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required to join the Pretodan VIP Club'
      });
    }

    const member = db.registerVip({
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : undefined
    });

    res.status(201).json({
      success: true,
      message: `Welcome to Pretodan VIP Club, ${member.name}! 250 bonus points credited.`,
      couponCode: 'PRETOVIP15',
      data: member
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to join VIP club', error });
  }
});

// GET /api/stats - Restaurant statistics for footer or admin
vipRouter.get('/stats', (_req: Request, res: Response) => {
  try {
    const stats = db.getStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve stats', error });
  }
});
