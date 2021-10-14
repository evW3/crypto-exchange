import * as Joi from 'joi';
const now = Date.now();
const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 18));

export const ProvidePersonalInformationSchema = Joi.object({
    id: Joi.number().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    countryOfResidence: Joi.string().required(),
    homeCountry: Joi.string().required(), 
    phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    birthDate: Joi.date().iso().max(cutoffDate).required()
});