const singup_schema = {
  token: "",
  form_data: {
    plan_type: "keto" || "weigth loss" || "weigth gain",
    meals: {
      frecuence: "weekly" || "montly",
      meals_per_week: 10
    },
    menu: {
      nots: [
        "vegetables" || "...vegetables_items",
        "carbs" || "...carbs_items",
        "proteins_items"
      ]
    },
    costumer: {
      name: "Name",
      phone: "phoneNumber",
      delivery_address: ""
    },
    checkout: {
      name_on_card: "",
      card_number: "",
      expiration_date: "",
      cvv: "",
      billing_zip_code: ""
    }
  }
};
