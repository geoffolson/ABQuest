import { z } from "zod";

export const UserRegistration = z.object({
  username: z.string(),
  password: z.string(),
});

export const Vector = z.object({
  x: z.number(),
  y: z.number(),
});

export const SavedState = z.object({
  position: Vector,
  endpoint: Vector,
  health: z.number(),
  moves: z.number(),
  seed: z.number(),
});
