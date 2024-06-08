import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { SavedState, UserRegistration } from "common";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(passport.initialize());

passport.use(
  new LocalStrategy.Strategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { username } });
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);

// JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "your_secret_key",
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { username: payload.username },
      });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }),
);

app.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    (err: any, user: any, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      const token = jwt.sign(
        { username: user.username },
        jwtOptions.secretOrKey,
      );
      return res.json({ token });
    },
  )(req, res, next);
});

app.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      username: req.user?.username,
      savedGameId: req.user?.savedGameId,
    });
  },
);

app.get(
  "/save",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const id = z.number().parse(req.user?.savedGameId);
    const savedGame = await prisma.savedGame.findFirst({ where: { id } });
    res.json({
      position: {
        x: savedGame?.positionX,
        y: savedGame?.positionY,
      },
      endpoint: {
        x: savedGame?.endPositionX,
        y: savedGame?.endPositionY,
      },
      seed: savedGame?.seed,
      moves: savedGame?.moves,
      health: savedGame?.health,
    });
  },
);

app.post(
  "/save",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const body = SavedState.parse(req.body);
    const data = {
      positionX: body.position.x,
      positionY: body.position.y,
      endPositionX: body.endpoint.x,
      endPositionY: body.endpoint.y,
      health: body.health,
      moves: body.moves,
      seed: body.seed,
    };
    const userId = z.number().parse(req?.user?.id);
    try {
      const savedGameId = z.number().optional().parse(req?.user?.savedGameId);
      await prisma.savedGame.update({
        data,
        where: {
          id: savedGameId,
        },
      });
    } catch (e) {
      const { id } = await prisma.savedGame.create({ data });
      await prisma.user.update({
        data: {
          savedGameId: id,
        },
        where: {
          id: userId,
        },
      });
      if (req.user) req.user.savedGameId = id;
    }
    res.json(req.user);
  },
);

app.post("/register", async (req, res) => {
  try {
    const { username, password } = UserRegistration.parse(req.body);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findFirst({ where: { username } });
    if (existingUser) {
      console.error("Error creating user:", "Username already exists");
      res.status(400).json({ message: "Username already exists" });
      return;
    }

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
