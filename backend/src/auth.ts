import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { prisma } from './prisma';

passport.serializeUser((user: any, done) => done(null, user.email));
passport.deserializeUser(async (email: string, done) => {
  const user = await prisma.user.findUnique({ where: { email } });
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.HOST_URL}/auth/google/callback`,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const { displayName, emails, photos } = profile;
      const email = emails?.[0]?.value!;
      const image = photos?.[0]?.value;
      let user = await prisma.user.findUnique({ where: { email: email } });
      if (!user) {
        user = await prisma.user.create({
          data: { name: displayName, email, image }
        });
      }
      done(null, user);
    }
  )
);