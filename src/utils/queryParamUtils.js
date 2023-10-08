/**
 * Get and remove a query parameter from the current URL.
 * @param {string} paramName - The name of the query parameter to retrieve and remove.
 * @returns {string|null} - The value of the query parameter or null if it doesn't exist.
 */
export const getAndRemoveQueryParam = paramName => {
  const paramValue = new URLSearchParams(window.location.search).get(paramName);
  if (paramValue) {
    const url = new URL(window.location.href);
    url.searchParams.delete(paramName);
    window.history.replaceState({}, document.title, url);
  }
  return paramValue;
};
