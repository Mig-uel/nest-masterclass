import * as Joi from 'joi';

// Validate all env variables
export default Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'test', 'prod', 'staging').default('dev'),
  DB_PORT: Joi.number().port().default(5432),

  PROFILE_API_KEY: Joi.string().required(),

  // TODO => convert env names from PG to DB
  PG_PASSWORD: Joi.string().required(),
  PG_HOST: Joi.string().required(),
  PG_USER: Joi.string().required(),
  PG_DATABASE: Joi.string().required(),

  // JWT variables
  JWT_SECRET: Joi.string().required(),
  JWT_TOKEN_AUDIENCE: Joi.string().required(),
  JWT_TOKEN_ISSUER: Joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: Joi.number().required(),
  JWT_REFRESH_TOKEN_TTL: Joi.number().required(),

  // Google client variables
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),

  // API version
  API_VERSION: Joi.string().required(),
});
