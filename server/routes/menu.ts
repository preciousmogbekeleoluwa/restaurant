import { Router, Request, Response } from 'express';
import { db } from '../db';

export const menuRouter = Router();

// GET /api/menu - Get all menu items with optional category and search filters
menuRouter.get('/', (req: Request, res: Response) => {
  try {
    const category = typeof req.query.category === 'string' ? req.query.category : undefined;
    const search = typeof req.query.search === 'string' ? req.query.search : undefined;
    const items = db.getMenu(category, search);
    res.json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve menu items', error });
  }
});

// GET /api/menu/:id - Get specific dish by ID
menuRouter.get('/:id', (req: Request, res: Response) => {
  try {
    const item = db.getMenuItemById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: `Dish with ID ${req.params.id} not found` });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve dish', error });
  }
});
