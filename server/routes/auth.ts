import { Router, Request, Response } from 'express';
import { db } from '../db';

export const authRouter = Router();

// POST /api/auth/login - Patron sign in
authRouter.post('/login', (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required' });
    }

    let user = db.getUserByEmail(email);
    if (!user) {
      // Auto-create patron profile for ease of guest access
      const namePart = email.split('@')[0].replace(/[._-]/g, ' ');
      const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      user = db.registerCustomerUser({
        name: formattedName || 'Valued Guest',
        email,
        phone: '+1 (555) 234-8901'
      });
    }

    res.json({
      success: true,
      message: `Welcome back to Pretodan, ${user.name}!`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        deliveryAddress: user.deliveryAddress,
        dietaryPreferences: user.dietaryPreferences,
        tier: user.tier,
        points: user.points,
        joinedAt: user.joinedAt
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to process login', error });
  }
});

// POST /api/auth/register - Create new customer patron account
authRouter.post('/register', (req: Request, res: Response) => {
  try {
    const { name, email, phone, deliveryAddress, dietaryPreferences, password } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email address, and phone number are required'
      });
    }

    const user = db.registerCustomerUser({
      name,
      email,
      phone,
      deliveryAddress,
      dietaryPreferences,
      password
    });

    res.status(201).json({
      success: true,
      message: `Account created! Welcome to Pretodan Restaurant, ${user.name}.`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        deliveryAddress: user.deliveryAddress,
        dietaryPreferences: user.dietaryPreferences,
        tier: user.tier,
        points: user.points,
        joinedAt: user.joinedAt
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to register account', error });
  }
});

// PUT /api/auth/profile - Update patron profile details
authRouter.put('/profile', (req: Request, res: Response) => {
  try {
    const { id, email, ...updates } = req.body;
    let targetUser = id ? db.getUserById(id) : email ? db.getUserByEmail(email) : null;

    if (!targetUser) {
      return res.status(404).json({ success: false, message: 'User profile not found' });
    }

    const updated = db.updateCustomerUser(targetUser.id, updates);
    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update profile', error });
  }
});

// GET /api/auth/users - List patrons (concierge administration)
authRouter.get('/users', (_req: Request, res: Response) => {
  try {
    const users = db.getUsers().map(({ password, ...u }) => u);
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve users', error });
  }
});
