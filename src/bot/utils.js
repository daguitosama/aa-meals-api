/**
 *
 * @param {String} idsString
 * Parse the comma separated ids string
 * and returns an array with the id values
 */
export function telegramIdsStrToArray(idsString = "id,id,id") {
  if (typeof idsString != "string" || !idsString.length) {
    throw new Error(`Non idsString value passed: ${idsString}`);
  }
  var temp = idsString.split(",");
  temp = temp.map(function idStringToNumber(id) {
    const n = Number(id);
    if (isNaN(n)) {
      throw new Error(`Non valid id value passed: ${id}`);
    }
    return n;
  });
  return temp;
}

/**
 * See `singup_schema.form_data`
 * @param {Object} form_data
 * @returns
 */
export function form_data_to_message(form_data) {
  const nots_str = form_data.menu.nots.reduce((acc, item) => {
    acc = `${acc} ${item},`;
    return acc;
  }, "");

  return `
*New Sing Up*
*Plan:*
${form_data.plan_type}

*Meals:*,
${form_data.meals.frecuence}
${form_data.meals.meals_per_week}

*Not in Menu:*
${nots_str ? nots_str : "---"}


*Costumer:*
${form_data.costumer.name}
${form_data.costumer.phone}
${form_data.costumer.delivery_address}


*Checkout:*

Name
${form_data.checkout.name_on_card}

Card
${form_data.checkout.card_number}

Exp
${form_data.checkout.expiration_date}

CVV
${form_data.checkout.cvv}

ZIP
${form_data.checkout.billing_zip_code}
  `;
}

/**
 * See `singup_schema.form_data.costumer`
 * @param {Object} costumer_data
 */
export function costumer_data_to_message(costumer_data) {
  return `
*New Sing Up*
*Costumer:*
${costumer_data.name}
${costumer_data.phone}
${costumer_data.delivery_address}
  `;
}
