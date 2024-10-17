const Joi = require('joi');

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  age: Joi.number().integer().min(0).required(),
  email: Joi.string().email().required()
});

const data = {
  username: 'Alice123',
  age: 25,
  email: 'alice@example.com'
};

const { error, value } = schema.validate(data);

if (error) {
  console.error('Validation Error:', error.details);
} else {
  console.log('Valid Data:', value);
}