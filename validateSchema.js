//for server side validation
const Joi = require("joi");

module.exports.productSchema = Joi.object({
  product: Joi.object({
    title: Joi.string().required(),
    price: Joi.number().min(0).required(),
    discountprice: Joi.number().min(0).required(),
    image: Joi.object({
      url: Joi.string().uri().optional(),
      filename: Joi.string().optional(),
    }).optional(), 
    bgcolor: Joi.string().optional(), 
    panelcolor: Joi.string().optional(),
    textcolor: Joi.string().optional(), 
  }).required(),
});
