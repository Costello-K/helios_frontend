export const formValidator = (form, rules) => {
  const copyForm = { ...form.value };
  const validationFormRules1 = { ...rules.value };

  for (const [key, value] of Object.entries(copyForm)) {
    if (!validationFormRules1[key].every(rule => rule(value) === true)) {
      return false;
    }
  }

  return true;
};
