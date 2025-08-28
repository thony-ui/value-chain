import * as z from "zod";

const createPostValidator = z.object({
  user_id: z.string().uuid("Invalid user ID format"),
  parent_post_id: z
    .string()
    .uuid("Invalid parent post ID format")
    .nullable()
    .optional(),
});

type TCreatePostValidator = z.infer<typeof createPostValidator>;

export function validateCreatePost(data: unknown): TCreatePostValidator {
  try {
    const parsed = createPostValidator.parse(data);
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `Validation error: ${error.errors.map((e) => e.message).join(", ")}`
      );
    }
    throw error;
  }
}

const getPostValidator = z.object({
  id: z.string().uuid("Invalid post ID format"),
});
type TGetPostValidator = z.infer<typeof getPostValidator>;

export function validateGetPost(data: unknown): TGetPostValidator {
  try {
    const parsed = getPostValidator.parse(data);
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `Validation error: ${error.errors.map((e) => e.message).join(", ")}`
      );
    }
    throw error;
  }
}
