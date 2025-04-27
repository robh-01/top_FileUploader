// import pool from "../db/pool.js";
import { prisma } from "../db/prismaClient.js";

import passport from "passport";
import passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;

import bcrypt from "bcryptjs";

function configPassport(app) {
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        const enteredEmail = email;

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: enteredEmail,
            },
          });
          // const user = rows[0];
          if (!user) {
            return done(null, false, { message: "User not available." });
          }
          const match = await bcrypt.compare(password, user.password);
          if (!match) {
            return done(null, false, { message: "Password does not match." });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const searchId = id;
      //   const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [
      //     id,
      //   ]);
      //   const user = rows[0];
      const user = await prisma.user.findUnique({
        where: {
          id: searchId,
        },
      });
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

export { configPassport, passport };
