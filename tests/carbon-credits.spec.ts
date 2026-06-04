import { test, expect } from '@playwright/test';
import { ApiHelper } from './helpers/apiHelper';
import {
  ENDPOINTS,
  EXPECTED_DATA,
  PROMOTIONS,
  ERROR_CASES,
} from './fixtures/testData';

test.describe('Carbon Credits API Tests', () => {
  let apiHelper: ApiHelper;

  test.beforeEach(async ({ request }) => {
    apiHelper = new ApiHelper(request);
  });

  test.describe('Acceptance Criteria', () => {
    test('AC1: Name should be "Carbon credits"', async () => {
      const { status, data } = await apiHelper.getCategoryDetails(
        ENDPOINTS.getCategoryDetails()
      );

      expect(status).toBe(200);
      expect(data.Name).toBe(EXPECTED_DATA.name);
    });

    test('AC2: CanRelist should be true', async () => {
      const { data } = await apiHelper.getCategoryDetails(
        ENDPOINTS.getCategoryDetails()
      );

      expect(data.CanRelist).toBe(EXPECTED_DATA.canRelist);
    });

    test('AC3: Gallery promotion description should contain "Good position in category"', async () => {
      const { data } = await apiHelper.getCategoryDetails(
        ENDPOINTS.getCategoryDetails()
      );

      expect(Array.isArray(data.Promotions)).toBe(true);

      const galleryPromotion = data.Promotions.find(
        (promotion: { Name: string }) => promotion.Name === PROMOTIONS.gallery.name
      );

      expect(galleryPromotion).toBeDefined();
      expect(galleryPromotion.Description).toContain(
        PROMOTIONS.gallery.descriptionKeyword
      );
    });
  });

  test.describe('Edge Cases', () => {
    test('Gallery promotion should have required fields', async () => {
      const { data } = await apiHelper.getCategoryDetails(
        ENDPOINTS.getCategoryDetails()
      );

      const galleryPromotion = data.Promotions.find(
        (promotion: { Name: string }) => promotion.Name === PROMOTIONS.gallery.name
      );

      expect(galleryPromotion).toHaveProperty('Name');
      expect(galleryPromotion).toHaveProperty('Description');
      expect(galleryPromotion.Description).not.toBe('');
    });

    test('Response structure should be valid', async () => {
      const { data } = await apiHelper.getCategoryDetails(
        ENDPOINTS.getCategoryDetails()
      );

      expect(data).toHaveProperty('Name');
      expect(data).toHaveProperty('CanRelist');
      expect(data).toHaveProperty('Promotions');
      expect(Array.isArray(data.Promotions)).toBe(true);
      expect(data.Promotions.length).toBeGreaterThan(0);
    });

    test('Data types should be correct', async () => {
      const { data } = await apiHelper.getCategoryDetails(
        ENDPOINTS.getCategoryDetails()
      );

      expect(typeof data.Name).toBe('string');
      expect(typeof data.CanRelist).toBe('boolean');
      expect(Array.isArray(data.Promotions)).toBe(true);
    });
  });

  test.describe('Negative Cases', () => {
    test('Invalid category ID should not return success', async () => {
      const { status } = await apiHelper.getCategoryDetails(
        ENDPOINTS.getInvalidCategoryDetails()
      );

      expect(status).not.toBe(200);
    });

    test('Gallery promotion must exist', async () => {
      const { data } = await apiHelper.getCategoryDetails(
        ENDPOINTS.getCategoryDetails()
      );

      const galleryExists = data.Promotions.some(
        (promotion: { Name: string }) => promotion.Name === PROMOTIONS.gallery.name
      );

      expect(galleryExists).toBe(true);
    });

    test('Name should match exactly (case-sensitive)', async () => {
      const { data } = await apiHelper.getCategoryDetails(
        ENDPOINTS.getCategoryDetails()
      );

      expect(data.Name).not.toBe(ERROR_CASES.invalidName);
      expect(data.Name).not.toBe(ERROR_CASES.invalidNameVariant);
    });

    test('CanRelist should not be false', async () => {
      const { data } = await apiHelper.getCategoryDetails(
        ENDPOINTS.getCategoryDetails()
      );

      expect(data.CanRelist).toBe(true);
      expect(data.CanRelist).not.toBe(false);
    });

    test('Response should not be null or empty', async () => {
      const { data } = await apiHelper.getCategoryDetails(
        ENDPOINTS.getCategoryDetails()
      );

      expect(data).not.toBeNull();
      expect(Object.keys(data).length).toBeGreaterThan(0);
      expect(data.Name).not.toBeNull();
      expect(data.Name).not.toBe('');
    });
  });

  test.describe('Data Consistency', () => {
    test('API response should be consistent across requests', async () => {
      const { data: data1 } = await apiHelper.getCategoryDetails(
        ENDPOINTS.getCategoryDetails()
      );

      const { data: data2 } = await apiHelper.getCategoryDetails(
        ENDPOINTS.getCategoryDetails()
      );

      expect(data1.Name).toBe(data2.Name);
      expect(data1.CanRelist).toBe(data2.CanRelist);
    });
  });
});
