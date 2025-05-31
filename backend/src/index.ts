import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import './auth';
import movieRouter from './routes/movie';
import funfactRouter from './routes/funfact';

const app = express();
app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true
    })
);
app.use(express.json());

app.use(
  session({ secret: process.env.SESSION_SECRET!, resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

// Auth endpoints
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (_req, res) => res.redirect(`${process.env.CLIENT_URL}/`) 
);

app.get('/auth/failure', (_req, res) => {
  res.redirect(`${process.env.CLIENT_URL}/`);
});

app.get('/auth/logout', (req, res) => {
    req.logout(() => {
      req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect(`${process.env.CLIENT_URL}/login`);
      });
    });
});
  

// Current session user
app.get('/auth/me', (req, res) => {
    if (!req.user) {
      res.sendStatus(401);
      return;
    }
    const { name, email, image, movies } = req.user as any;
    res.send({ user: { name, email, image, movies } });
});

// API routes
app.use('/api/movie', movieRouter);
app.use('/api/funfact', funfactRouter);

app.listen(4000, () => console.log('Backend listening on port 4000'));