import { Router, Request, Response } from 'express';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const router = Router();

const getFunfact = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.sendStatus(401);
      return;
    }
    const movie = (req.user as any).favoriteMovie;
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a movie trivia expert.' },
        { role: 'user', content: `Tell me one interesting trivia fact about the movie "${movie}".` }
      ]
    });
    res.send({ fact: response.choices[0].message.content });
  } catch (err) {
    console.error('get fun fact api failed: ', err);
  }
};

router.get('/', getFunfact);
export default router;