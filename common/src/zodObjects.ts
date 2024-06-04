import { z } from "zod";

export const UserRegistration = z.object({
  username: z.string(),
  password: z.string(),
});

export const vector = z.object({
  x: z.number(),
  y: z.number(),
});

export const savedState = z.object({
  position: vector,
  endpoint: vector,
  health: z.number(),
  moves: z.number(),
  seed: z.number(),
});
