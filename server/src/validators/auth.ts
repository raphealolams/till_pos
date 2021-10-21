import * as Joi from 'joi';

class AuthValidator {
  public login() {
    return Joi.object({
      username: Joi.string().required(),
      password: Joi.string()
        .alphanum()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
    });
  }
}

export default new AuthValidator();
