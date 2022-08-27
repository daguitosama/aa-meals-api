import joi from "joi";
import { bot } from "~/bot/bot_api_service";
import { costumer_data_to_message, form_data_to_message } from "~/bot/utils";

export async function on_singup(req, res, next) {
  const { form_data } = req.body;
  try {
    if (!is_valid_form_data(form_data)) {
      return res.status(400).json({ error: "Bad Request", ok: false });
    }
    const message = form_data_to_message(form_data);
    await bot.notify_business_administrators(message);
    return res.status(200).json({ ok: true, error: null });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Server Failure", ok: false });
  }
}

export async function on_lean_singup(req, res, next) {
  const { costumer_data } = req.body;
  try {
    if (!is_valid_costumer_data(costumer_data)) {
      return res.status(400).json({ error: "Bad Request", ok: false });
    }
    const message = costumer_data_to_message(costumer_data);
    await bot.notify_business_administrators(message);
    return res.status(200).json({ ok: true, error: null });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Server Failure", ok: false });
  }
}

const form_data_schema = joi.object({
  plan_type: joi.string().not().empty().required(),
  meals: joi.object({
    frecuence: joi.string().not().empty().required(),
    meals_per_week: joi.string().not().empty().required(),
  }),
  menu: joi.object({
    nots: joi.array().required(),
  }),
  costumer: joi.object({
    name: joi.string().not().empty().required(),
    phone: joi.string().not().empty().required(),
    delivery_address: joi.string().not().empty().required(),
  }),
  checkout: joi.object({
    name_on_card: joi.string().not().empty().required(),
    card_number: joi.string().not().empty().required(),
    expiration_date: joi.string().not().empty().required(),
    cvv: joi.string().not().empty().required(),
    billing_zip_code: joi.string().not().empty().required(),
  }),
});

const costumer_schema = joi.object({
  name: joi.string().not().empty().required(),
  phone: joi.string().not().empty().required(),
  delivery_address: joi.string().not().empty().required(),
});

function is_valid_form_data(form_data) {
  const v_result = form_data_schema.validate(form_data);
  // console.log({v_result})
  return !v_result.error;
}

function is_valid_costumer_data(costumer_data) {
  const v_result = costumer_schema.validate(costumer_data);
  // console.log({v_result})
  return !v_result.error;
}
