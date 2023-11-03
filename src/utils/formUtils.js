export const formValidator = (form, rules) => {
  const copyForm = { ...form.value };
  const validationFormRules = { ...rules.value };

  return Object.entries(copyForm).every(
    ([key, value]) => validationFormRules[key].every(
      rule => rule(value) === true
    )
  );
};


export const nestedFormValidator = (form, rules) => {
  const copyForm = { ...form };
  const validationFormRules = { ...rules };

  const iter = ([key, value]) => {
    if (Array.isArray(value)) {
      return value.map(item => {
        return Object.entries(item).every(([key_1, value_1]) => iter([key_1, value_1]));
      }).every(value => value === true);
    } else {
      return validationFormRules[key].every(rule => rule(value) === true);
    }
  };

  return Object.entries(copyForm).every(([key, value]) => iter([key, value]));
};
