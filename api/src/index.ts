import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(cors());

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
  })
);

// JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "your_secret_key",
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { username: payload.username } });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

app.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    const token = jwt.sign({ username: user.username }, jwtOptions.secretOrKey);
    return res.json({ token });
  })(req, res, next);
});

app.get("/profile", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({
    username: req.user?.username,
    savedGameId: req.user?.savedGameId,
  });
});

app.get("/save", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const id = z.number().parse(req.user?.savedGameId);
  const savedGame = await prisma.savedGame.findFirst({ where: { id } });
  res.json({
    position: [savedGame?.positionX, savedGame?.endPositionY],
    endpoint: [savedGame?.endPositionX, savedGame?.endPositionY],
    seed: savedGame?.seed,
    moves: savedGame?.moves,
    health: savedGame?.health,
  });
});

const savedState = z.object({
  position: z.number().array().min(2).max(2),
  endpoint: z.number().array().min(2).max(2),
  health: z.number(),
  moves: z.number(),
  seed: z.number(),
});
app.post("/save", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const data = savedState.parse(req.body);
  const userId = z.number().parse(req?.user?.id);
  try {
    const savedGameId = z.number().optional().parse(req?.user?.savedGameId);
    await prisma.savedGame.update({
      data: {
        positionX: data.position[0],
        positionY: data.position[1],
        endPositionX: data.endpoint[0],
        endPositionY: data.endpoint[1],
        health: data.health,
        moves: data.moves,
        seed: data.seed,
      },
      where: {
        id: savedGameId,
      },
    });
  } catch (e) {
    const { id } = await prisma.savedGame.create({
      data: {
        positionX: data.position[0],
        positionY: data.position[1],
        endPositionX: data.endpoint[0],
        endPositionY: data.endpoint[1],
        health: data.health,
        moves: data.moves,
        seed: data.seed,
      },
    });
    await prisma.user.update({
      data: {
        savedGameId: id,
      },
      where: {
        id: userId,
      },
    });
  }
  res.json(req.user);
});

// Route to create a new user
const UserRegistration = z.object({
  username: z.string(),
  password: z.string(),
});
app.post("/register", async (req, res) => {
  try {
    const { username, password } = UserRegistration.parse(req.body);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
