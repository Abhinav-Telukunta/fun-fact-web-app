import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';

const router = Router();

const postMovie = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.sendStatus(401);
      return;
    }
    const { movies } = req.body;
    const response = await prisma.user.update({ where: { email: (req.user as any).email }, data: { movies: {set: movies} } });
    res.send(response);
  } catch (err) {
    console.error('post movie API failed: ', err);
    res.sendStatus(501);
  }
};

router.post('/', postMovie);
export default router;