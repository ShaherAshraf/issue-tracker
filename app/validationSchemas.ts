import { z } from 'zod';

export const issueSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required.')
    .max(255)
    .refine((value) => value!.trim().length > 0, 'Title cannot be just whitespace'),
  description: z
    .string()
    .min(1, 'Description is required.')
    .max(65535)
    .refine((value) => value!.trim().length > 0, 'Description cannot be just whitespace'),
});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required.')
    .max(255)
    .refine((value) => value!.trim().length > 0, 'Title cannot be just whitespace')
    .optional(),
  description: z
    .string()
    .min(1, 'Description is required.')
    .max(65535)
    .refine((value) => value!.trim().length > 0, 'Description cannot be just whitespace')
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, 'AssignedToUserId is required.')
    .max(255)
    .optional()
    .nullable(),
  status: z.string().min(1, 'Status is required.').max(255).optional(),
});
