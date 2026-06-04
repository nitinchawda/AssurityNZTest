/**
 * API Helper Functions
 * Handles all API interaction logic
 */

import { APIRequestContext } from '@playwright/test';

export class ApiHelper {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Fetch category details from API
   * @param url - The API endpoint URL
   * @returns Response object with status and JSON data
   */
  async getCategoryDetails(url: string) {
    const response = await this.request.get(url);
    return {
      status: response.status(),
      data: await response.json(),
      response,
    };
  }

  /**
   * Fetch category details and handle potential errors
   * @param url - The API endpoint URL
   * @returns JSON response data or null if error
   */
  async fetchCategoryData(url: string) {
    try {
      const response = await this.request.get(url);
      if (response.status() === 200) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Error fetching category data:', error);
      return null;
    }
  }
}
