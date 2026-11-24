import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { menuRouter } from './routes/menu';
import { ordersRouter } from './routes/orders';
import { reservationsRouter } from './routes/reservations';
import { reviewsRouter } from './routes/reviews';
import { contactRouter } from './routes/contact';
import { vipRouter } from './routes/vip';
import { db } from './db';

export const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Request logger
app.use((req: Request, _res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  }
  next();
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'Pretodan Restaurant Backend API',
    category: 'Continental Fine Dining & Cuisine',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    stats: db.getStats()
  });
});

// API Routes
app.use('/api/menu', menuRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/reservations', reservationsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/vip', vipRouter);
app.use('/api', vipRouter); // Mount /api/stats

// 404 handler for API routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.method} ${req.originalUrl} not found`
  });
});

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? undefined : err.message
  });
});
