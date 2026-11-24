import { Router, Request, Response } from 'express';
import { db } from '../db';

export const ordersRouter = Router();

// GET /api/orders - Get recent orders
ordersRouter.get('/', (_req: Request, res: Response) => {
  try {
    const orders = db.getOrders();
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve orders', error });
  }
});

// GET /api/orders/:orderId - Track a single order
ordersRouter.get('/:orderId', (req: Request, res: Response) => {
  try {
    const order = db.getOrderByReference(req.params.orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order reference ${req.params.orderId} not found. Please check your reference code.`
      });
    }

    // Dynamic progression simulation based on elapsed time if preparing
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve order', error });
  }
});

// POST /api/orders - Place a new order
ordersRouter.post('/', (req: Request, res: Response) => {
  try {
    const {
      items,
      deliveryAddress,
      customerNotes,
      customerName,
      customerPhone,
      paymentMethod = 'card',
      paymentStatus = 'paid'
    } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item'
      });
    }

    const calculatedSubtotal = items.reduce(
      (sum: number, it: any) => sum + (Number(it.price) || 0) * (Number(it.quantity) || 1),
      0
    );
    const deliveryFee = calculatedSubtotal >= 70 ? 0 : 12;
    const totalAmount = calculatedSubtotal + deliveryFee;
    const itemsCount = items.reduce((sum: number, it: any) => sum + (Number(it.quantity) || 1), 0);

    const now = new Date();
    const timeFormatted = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    const newOrder = db.createOrder({
      customerName: customerName || 'Pretodan Patron',
      customerPhone: customerPhone || '+1 (555) 000-0000',
      deliveryAddress: deliveryAddress || '123 Grand Continental Boulevard',
      customerNotes: customerNotes || '',
      items,
      itemsCount,
      subtotal: calculatedSubtotal,
      deliveryFee,
      totalAmount,
      totalFormatted: `$${totalAmount}.00`,
      paymentMethod,
      paymentStatus,
      estimatedMinutes: 25,
      timestamp: `Today, ${timeFormatted}`,
      status: 'preparing'
    });

    res.status(201).json({
      success: true,
      message: 'Order successfully placed with Pretodan Restaurant!',
      data: newOrder
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create order', error });
  }
});

// PATCH /api/orders/:orderId/status - Update order tracking status
ordersRouter.patch('/:orderId/status', (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const validStatuses = ['received', 'preparing', 'plating', 'dispatch', 'delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const updated = db.updateOrderStatus(req.params.orderId, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, message: 'Order status updated', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update order status', error });
  }
});
