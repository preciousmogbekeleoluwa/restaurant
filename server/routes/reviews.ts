import { Router, Request, Response } from 'express';
import { db } from '../db';

export const reviewsRouter = Router();

// GET /api/reviews - Get all verified reviews
reviewsRouter.get('/', (_req: Request, res: Response) => {
  try {
    const reviews = db.getReviews();
    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve reviews', error });
  }
});

// POST /api/reviews - Submit guest review
reviewsRouter.post('/', (req: Request, res: Response) => {
  try {
    const { name, content, rating = 5, favoriteDish = 'Prime Aged Continental Ribeye Steak' } = req.body;

    if (!name || !content) {
      return res.status(400).json({
        success: false,
        message: 'Name and review content are required'
      });
    }

    const newReview = db.createReview({
      name: name.trim(),
      content: content.trim(),
      rating: Math.min(5, Math.max(1, Number(rating) || 5)),
      favoriteDish
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your dining review has been published.',
      data: newReview
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to publish review', error });
  }
});
