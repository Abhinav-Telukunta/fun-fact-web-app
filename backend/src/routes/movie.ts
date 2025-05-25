import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../prisma';

const router = Router();

const postMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.sendStatus(401);
      return;
    }
    const { favoriteMovie } = req.body;
    await prisma.user.update({ where: { email: (req.user as any).email }, data: { favoriteMovie } });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

router.post('/', postMovie);
export default router;