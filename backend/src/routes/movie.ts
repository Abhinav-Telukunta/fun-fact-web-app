import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';

const router = Router();

const postMovie = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.sendStatus(401);
      return;
    }
    const { favoriteMovie } = req.body;
    await prisma.user.update({ where: { email: (req.user as any).email }, data: { favoriteMovie } });
  } catch (err) {
    console.error('post movie API failed: ', err);
  }
};

router.post('/', postMovie);
export default router;