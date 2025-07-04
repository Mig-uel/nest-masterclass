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
});
