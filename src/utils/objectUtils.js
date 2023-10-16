/**
 * Creates an empty object with the same keys as the input object,
 * where each key has an empty string as its default value.
 *
 * @param {Object} obj - The input object whose keys will be used.
 * @returns {Object} An object with the same keys and empty string values.
 */
export const createEmptyObject = obj => {
  const emptyObject = {};
  for (const key of Object.keys(obj)) {
    emptyObject[key] = '';
  }
  return emptyObject;
};

/**
 * Creates an empty object with the same keys as the input object,
 * where each key has an empty string as its default value, except for 'id' which is set to null.
 *
 * @param {Object} obj - The input object whose keys will be used.
 * @returns {Object} An object with the same keys, empty string values, and 'id' set to null if it exists.
 */
export const createEmptyObjectWithNullId = obj => {
  const emptyObj = createEmptyObject(obj);

  if ('id' in emptyObj) {
    emptyObj.id = null;
  }

  return emptyObj
};

/**
 * Creates a new object and assigns values from matching fields in mainObject to mergeObject.
 *
 * @param {Object} mainObj - The main object from which values will be assigned.
 * @param {Object} mergeObj - The object to which values will be merged.
 * @returns {Object} A new object with merged values.
 */
export const mergeObjects = (mainObj, mergeObj) => {
  for (const key in mainObj) {
    if (key in mergeObj) {
      mainObj[key] = mergeObj[key];
    }
  }
  return {...mainObj};
};

/**
 * Creates a new object based on the input object, excluding keys with null or undefined values.
 *
 * @param {Object} obj - The input object to filter.
 * @returns {Object} A new object with non-null and non-undefined values.
 */
export const createObjectWithoutEmptyValues = obj => {
  const filteredObject = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && value !== undefined) {
      filteredObject[key] = value;
    }
  }
  return filteredObject;
};
