import { z } from "zod";

export const booleanSchema = z.enum(["1", "2"]);
