/**
 * API Test Data and Constants
 * Centralized configuration for API endpoints and expected values
 */

export const API_CONFIG = {
  BASE_URL: 'https://api.tmsandbox.co.nz/v1',
  CATEGORY_ID: '6327',
  CATALOGUE_PARAM: 'false',
};

export const ENDPOINTS = {
  getCategoryDetails: () => 
    `${API_CONFIG.BASE_URL}/Categories/${API_CONFIG.CATEGORY_ID}/Details.json?catalogue=${API_CONFIG.CATALOGUE_PARAM}`,
  
  getInvalidCategoryDetails: () =>
    `${API_CONFIG.BASE_URL}/Categories/99999999/Details.json?catalogue=${API_CONFIG.CATALOGUE_PARAM}`,
};

export const EXPECTED_DATA = {
  name: 'Carbon credits',
  canRelist: true,
};

export const PROMOTIONS = {
  gallery: {
    name: 'Gallery',
    descriptionKeyword: 'Good position in category',
  },
};

export const ERROR_CASES = {
  invalidCategoryId: 99999999,
  invalidName: 'carbon credits', // lowercase - should not match
  invalidNameVariant: 'Carbon Credits', // different case
  wrongDescription: 'Bad position in category',
};
