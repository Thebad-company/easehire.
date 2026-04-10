import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

type ValidateTarget = 'body' | 'query' | 'params';

/**
 * Validates and sanitizes request data against a Zod schema.
 * Strips unknown fields and throws a ZodError (caught by errorHandler) on failure.
 *
 * @param schema  - The Zod schema to validate against.
 * @param target  - Which part of the request to validate ('body' | 'query' | 'params').
 *
 * @example
 *   router.post('/jobs', requireAuthGuard, validate(createJobSchema), jobController.create);
 */
export const validate =
  (schema: ZodSchema, target: ValidateTarget = 'body') =>
  (req: Request, _res: Response, next: NextFunction): void => {
    // .parse() throws a ZodError which is caught by our central errorHandler
    // stripUnknown equivalent in Zod is done via .strip() (default behavior)
    req[target] = schema.parse(req[target]);
    next();
  };
