import { ValidationError } from 'joi';
import { getSchema } from 'joi-class-decorators';

export function validateAndTransformDTO<T>(dtoInstance: T): {
  error: ValidationError | null;
  value: Partial<T>;
} {
  const schema = getSchema(dtoInstance);
  const { error, value } = schema.validate(dtoInstance, {
    abortEarly: false,
    stripUnknown: true,
  });
  return { error, value };
}
