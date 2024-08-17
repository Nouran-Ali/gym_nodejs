import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Power Pulse Gym API Documentation',
      version: '1.0.0',
    },
    servers: [{ url: 'http://127.0.0.1:5000/api/v1' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Login: {
          type: 'object',
          properties: {
            phoneNumber: {
              type: 'string',
              description: "User's phone number",
              example: '0123456789',
            },
            password: {
              type: 'string',
              minLength: 8,
              description: "User's password",
              example: '123456789',
            },
          },
          required: ['phoneNumber', 'password'],
        },
        CreateSecretary: {
          type: 'object',
          properties: {
            phoneNumber: {
              type: 'string',
              description: "Secretary's phone number",
              example: '01126918406',
            },
            fullName: {
              type: 'string',
              description: "Secretary's full name",
              example: 'youssef wael',
            },
            gender: {
              type: 'string',
              enum: ['MALE', 'FEMALE'],
              description: "Secretary's gender",
              example: 'MALE',
            },
            dob: {
              type: 'string',
              format: 'date',
              description: "Secretary's date of birth",
              example: '2001-02-10',
            },
            password: {
              type: 'string',
              description: "Secretary's password",
              example: '123456789',
            },
            confirm_password: {
              type: 'string',
              description: 'Confirm password',
              example: '123456789',
            },
          },
          required: [
            'phoneNumber',
            'fullName',
            'gender',
            'dob',
            'password',
            'confirm_password',
          ],
        },
        UpdateSecretary: {
          type: 'object',
          properties: {
            phoneNumber: {
              type: 'string',
              description: "Secretary's phone number",
              example: '01126918406',
            },
            fullName: {
              type: 'string',
              description: "Secretary's full name",
              example: 'youssef wael',
            },
            gender: {
              type: 'string',
              enum: ['MALE', 'FEMALE'],
              description: "Secretary's gender",
              example: 'MALE',
            },
            dob: {
              type: 'string',
              format: 'date',
              description: "Secretary's date of birth",
              example: '2001-02-10',
            },
          },
        },
        Trainee: {
          type: 'object',
          properties: {
            parcode: { type: 'string' },
            phoneNumber: { type: 'string' },
            fullName: { type: 'string' },
            gender: { type: 'string', enum: ['MALE', 'FEMALE'] },
            dob: { type: 'string', format: 'date' },
            subscriptionType: {
              type: 'string',
              enum: ['PRIVATE', 'NOT_PRIVATE'],
            },
            subscriptionStatus: {
              type: 'string',
              enum: ['ACTIVE', 'INACTIVE', 'PENDING'],
            },
            subscriptionDate: { type: 'string', format: 'date' },
            subscriptionStartDate: { type: 'string', format: 'date' },
            subscriptionMonths: { type: 'number' },
            subscriptionClasses: { type: 'number' },
            paid: { type: 'number' },
            reminder: { type: 'number' },
            trainingName: { type: 'string' },
            offerName: { type: 'string' },
            medicalProblem: { type: 'string' },
            surgeries: { type: 'boolean' },
            goal: { type: 'string' },
            sundayNote: { type: 'string' },
            mondayNote: { type: 'string' },
            tuesdayNote: { type: 'string' },
            wednesdayNote: { type: 'string' },
            thursdayNote: { type: 'string' },
            fridayNote: { type: 'string' },
            saturdayNote: { type: 'string' },
            generalNote: { type: 'string' },
            idFace: { type: 'string' },
            idBack: { type: 'string' },
          },
          required: [
            'parcode',
            'phoneNumber',
            'fullName',
            'gender',
            'dob',
            'subscriptionType',
            'subscriptionStatus',
            'subscriptionDate',
            'subscriptionStartDate',
            'subscriptionMonths',
            'subscriptionClasses',
            'paid',
            'reminder',
            'idFace',
            'idBack',
          ],
        },
        CreateTrainee: {
          type: 'object',
          properties: {
            parcode: { type: 'string', example: '001' },
            phoneNumber: { type: 'string', example: '01010932484' },
            fullName: { type: 'string' },
            gender: {
              type: 'string',
              enum: ['MALE', 'FEMALE'],
              example: 'MALE',
            },
            dob: { type: 'string', format: 'date', example: '2001-07-23' },
            subscriptionType: {
              type: 'string',
              enum: ['PRIVATE', 'NOT_PRIVATE'],
              example: 'PRIVATE',
            },
            subscriptionStatus: {
              type: 'string',
              enum: ['ACTIVE', 'INACTIVE', 'PENDING'],
              example: 'ACTIVE',
            },
            subscriptionStartDate: {
              type: 'string',
              format: 'date',
              example: '2024-06-10',
            },
            subscriptionMonths: { type: 'number', example: 3 },
            subscriptionClasses: { type: 'number', example: 12 },
            paid: { type: 'number', example: 350 },
            reminder: { type: 'number', example: 0 },
            idFace: { type: 'string', format: 'binary' },
            idBack: { type: 'string', format: 'binary' },
            trainingName: { type: 'string', nullable: true },
            offerName: { type: 'string', nullable: true },
            medicalProblem: { type: 'string', nullable: true },
            surgeries: { type: 'boolean', nullable: true },
            goal: { type: 'string', nullable: true },
            sundayNote: { type: 'string', nullable: true },
            mondayNote: { type: 'string', nullable: true },
            tuesdayNote: { type: 'string', nullable: true },
            wednesdayNote: { type: 'string', nullable: true },
            thursdayNote: { type: 'string', nullable: true },
            fridayNote: { type: 'string', nullable: true },
            saturdayNote: { type: 'string', nullable: true },
            generalNote: { type: 'string', nullable: true },
          },
          required: [
            'parcode',
            'phoneNumber',
            'fullName',
            'gender',
            'dob',
            'subscriptionType',
            'subscriptionStatus',
            'subscriptionStartDate',
            'subscriptionMonths',
            'subscriptionClasses',
            'paid',
            'reminder',
            'idFace',
            'idBack',
          ],
        },
        UpdateTrainee: {
          type: 'object',
          properties: {
            parcode: {
              type: 'string',
              description: 'Parcode of the trainee',
              example: '123456',
              nullable: false,
            },
            phoneNumber: {
              type: 'string',
              description: 'Phone number of the trainee',
              example: '123-456-7890',
              nullable: false,
            },
            fullName: {
              type: 'string',
              description: 'Full name of the trainee',
              nullable: true,
            },
            gender: {
              type: 'string',
              enum: ['MALE', 'FEMALE'],
              description: 'Gender of the trainee',
              nullable: true,
            },
            dob: {
              type: 'string',
              format: 'date',
              description: 'Date of birth of the trainee in YYYY-MM-DD format',
              nullable: true,
            },
            subscriptionType: {
              type: 'string',
              enum: ['PRIVATE', 'NOT_PRIVATE'],
              description: 'Subscription type of the trainee',
              nullable: true,
            },
            subscriptionStatus: {
              type: 'string',
              enum: ['ACTIVE', 'INACTIVE', 'PENDING'],
              description: 'Subscription status of the trainee',
              nullable: true,
            },
            subscriptionStartDate: {
              type: 'string',
              format: 'date',
              description: 'Subscription start date in YYYY-MM-DD format',
              nullable: true,
            },
            subscriptionMonths: {
              type: 'number',
              description: 'Number of subscription months',
              nullable: true,
            },
            subscriptionClasses: {
              type: 'number',
              description: 'Number of subscription classes',
              nullable: true,
            },
            remainingClasses: {
              type: 'number',
              description: 'Number of remaining classes',
              nullable: true,
            },
            paid: {
              type: 'number',
              description: 'Amount paid',
              nullable: true,
            },
            reminder: {
              type: 'number',
              description: 'Reminder amount',
              nullable: true,
            },
            trainingName: {
              type: 'string',
              description: 'Training name',
              nullable: true,
            },
            offerName: {
              type: 'string',
              description: 'Offer name',
              nullable: true,
            },
            medicalProblem: {
              type: 'string',
              description: 'Medical problems',
              nullable: true,
            },
            surgeries: {
              type: 'string',
              description: 'Surgeries',
              nullable: true,
            },
            goal: {
              type: 'string',
              description: 'Goals',
              nullable: true,
            },
            sundayNote: {
              type: 'string',
              description: 'Notes for Sunday',
              nullable: true,
            },
            mondayNote: {
              type: 'string',
              description: 'Notes for Monday',
              nullable: true,
            },
            tuesdayNote: {
              type: 'string',
              description: 'Notes for Tuesday',
              nullable: true,
            },
            wednesdayNote: {
              type: 'string',
              description: 'Notes for Wednesday',
              nullable: true,
            },
            thursdayNote: {
              type: 'string',
              description: 'Notes for Thursday',
              nullable: true,
            },
            fridayNote: {
              type: 'string',
              description: 'Notes for Friday',
              nullable: true,
            },
            saturdayNote: {
              type: 'string',
              description: 'Notes for Saturday',
              nullable: true,
            },
            generalNote: {
              type: 'string',
              description: 'General notes',
              nullable: true,
            },
            idFace: {
              type: 'string',
              format: 'binary',
              description: 'ID face image',
              nullable: true,
            },
            idBack: {
              type: 'string',
              format: 'binary',
              description: 'ID back image',
              nullable: true,
            },
          },
        },
        CreateInBody: {
          type: 'object',
          properties: {
            traineeId: { type: 'number' },
            length: { type: 'number' },
            weight: { type: 'number' },
            shoulder: { type: 'number' },
            chest: { type: 'number' },
            belowChest: { type: 'number' },
            middle: { type: 'number' },
            stomach: { type: 'number' },
            buttocks: { type: 'number' },
            thigh: { type: 'number' },
            arm: { type: 'number' },
            BMI: { type: 'number' },
            currentSituation: { type: 'string' },
            dailyWaterNeed: { type: 'number' },
            caloriesRequired: { type: 'number' },
            muscleWeight: { type: 'number' },
            fatMass: { type: 'number' },
            boneDensity: { type: 'number' },
            bellyFat: { type: 'number' },
            dietFile: { type: 'string', format: 'binary' },
          },
          required: [
            'traineeId',
            'length',
            'weight',
            'shoulder',
            'chest',
            'belowChest',
            'middle',
            'stomach',
            'buttocks',
            'thigh',
            'arm',
            'BMI',
            'currentSituation',
            'dailyWaterNeed',
            'caloriesRequired',
            'muscleWeight',
            'fatMass',
            'boneDensity',
            'bellyFat',
          ],
        },
        UpdateInBody: {
          type: 'object',
          properties: {
            traineeId: { type: 'number' },
            length: { type: 'number' },
            weight: { type: 'number' },
            shoulder: { type: 'number' },
            chest: { type: 'number' },
            belowChest: { type: 'number' },
            middle: { type: 'number' },
            stomach: { type: 'number' },
            buttocks: { type: 'number' },
            thigh: { type: 'number' },
            arm: { type: 'number' },
            BMI: { type: 'number' },
            currentSituation: { type: 'string' },
            dailyWaterNeed: { type: 'number' },
            caloriesRequired: { type: 'number' },
            muscleWeight: { type: 'number' },
            fatMass: { type: 'number' },
            boneDensity: { type: 'number' },
            bellyFat: { type: 'number' },
            dietFile: { type: 'string', format: 'binary' },
          },
          required: [], // No required fields since all are optional
        },
        // You can include other schemas here if needed
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/v1/*.ts'],
};


export const swaggerUiOptions = {
  swaggerOptions: {
    // docExpansion: 'all', // To collapse the schema details by default
    defaultModelsExpandDepth: -1, // To hide schemas
  },
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
