import * as z from "zod";

const postUserValidator = z.object({
  id: z.string().uuid("Invalid user ID format"),
  handle: z.string().min(3, "Handle must be at least 3 characters long"),
});

type TPostUserValidator = z.infer<typeof postUserValidator>;

export function validatePostUser(data: unknown): TPostUserValidator {
  try {
    const parsed = postUserValidator.parse(data);
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `Validation error: ${error.errors.map((e) => e.message).join(", ")}`
      );
    }
    throw error; // rethrow unexpected errors
  }
}

const getUserValidator = z.object({
  id: z.string().uuid("Invalid user ID format"),
});
type TGetUserValidator = z.infer<typeof getUserValidator>;

export function validateGetUser(data: unknown): TGetUserValidator {
  try {
    const parsed = getUserValidator.parse(data);
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `Validation error: ${error.errors.map((e) => e.message).join(", ")}`
      );
    }
    throw error; // rethrow unexpected errors
  }
}
