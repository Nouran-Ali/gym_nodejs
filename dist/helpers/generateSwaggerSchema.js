"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDtoToSwaggerSchema = void 0;
// Function to map DTO schema to Swagger schema
const mapDtoToSwaggerSchema = (dtoSchema) => {
    const properties = {};
    const schemaDescription = dtoSchema.describe();
    if (schemaDescription && schemaDescription.children) {
        for (const child of schemaDescription.children) {
            properties[child.key] = {
                type: getTypeFromJoiType(child.schema),
                // Add additional properties such as description, enum, etc.
            };
        }
    }
    return {
        type: 'object',
        properties,
    };
};
exports.mapDtoToSwaggerSchema = mapDtoToSwaggerSchema;
// Helper function to get Swagger type from Joi type
const getTypeFromJoiType = (joiSchema) => {
    switch (joiSchema.type) {
        case 'number':
            return 'number';
        case 'string':
            return 'string';
        case 'date':
            return 'string';
        // Handle other types as needed
        default:
            return 'string';
    }
};
