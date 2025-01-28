import { z } from "zod";

// Blog validation schema with zod
const blogValidationSchema = z.object({
    body: z.object({
        title: z
            .string()
            .trim()
            .min(1, "Blog title is mandatory!"),
        content: z
            .string()
            .trim()
            .min(1, "Blog description is required!"),
        author: z.string().optional(),
        isPublished: z.boolean().optional().default(true),
        isDeletes: z.boolean().optional(),
    })
});

export default blogValidationSchema;