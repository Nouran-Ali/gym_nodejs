import { OpenAPIV3 } from 'openapi-types';
import * as Joi from 'joi';
import {
  createSecretarySchema,
  updateSecretarySchema,
} from '../dtos/secretary.dto';
import parse  from 'joi-to-swagger';

const swaggerDef: OpenAPIV3.ComponentsObject = {
  schemas: {},
};

const schemas = [createSecretarySchema, updateSecretarySchema];

for (const schema of schemas) {
  const { swagger, components } = parse(schema as Joi.Schema);
  Object.assign(swagger.schemas, components?.schemas);
}

export default swaggerDef;
