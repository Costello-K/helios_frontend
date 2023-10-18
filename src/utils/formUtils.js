export const formValidator = (form, rules) => {
  const copyForm = { ...form.value };
  const validationFormRules = { ...rules.value };

  return Object.entries(copyForm).every(
    ([key, value]) => validationFormRules[key].every(
      rule => rule(value) === true
    )
  );
};
