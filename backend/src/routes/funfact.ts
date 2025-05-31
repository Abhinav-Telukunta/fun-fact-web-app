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
    const movies = (req.user as any).movies;
    const movieFactsMap: {[key: string]: string} = {};
    for(let movie of movies){
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a movie trivia expert.' },
          { role: 'user', content: `Tell me one interesting trivia fact about the movie "${movie}".` }
        ]
      });
      const fact = response.choices[0].message.content;
      movieFactsMap[movie] = fact!;
    }
    res.send(movieFactsMap);
  } catch (err) {
    console.error('get fun fact api failed: ', err);
    res.sendStatus(501);
  }
};

router.get('/', getFunfact);
export default router;