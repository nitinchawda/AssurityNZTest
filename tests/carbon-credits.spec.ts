import { test, expect } from '@playwright/test';

test.describe('Carbon Credits API Tests', () => {
  const API_URL = 'https://api.tmsandbox.co.nz/v1/Categories/6327/Details.json?catalogue=false';

  test.describe('Acceptance Criteria', () => {
    test('AC1: Name should be "Carbon credits"', async ({ request }) => {
      const response = await request.get(API_URL);
      expect(response.status()).toBe(200);
      
      const data = await response.json();
      expect(data.Name).toBe('Carbon credits');
    });

    test('AC2: CanRelist should be true', async ({ request }) => {
      const response = await request.get(API_URL);
      const data = await response.json();
      
      expect(data.CanRelist).toBe(true);
    });

    test('AC3: Gallery promotion description should contain "Good position in category"', async ({ request }) => {
      const response = await request.get(API_URL);
      const data = await response.json();
      
      expect(Array.isArray(data.Promotions)).toBe(true);
      
      const galleryPromotion = data.Promotions.find(
        (promotion: { Name: string }) => promotion.Name === 'Gallery'
      );
      
      expect(galleryPromotion).toBeDefined();
      expect(galleryPromotion.Description).toContain('Good position in category');
    });
  });

  test.describe('Edge Cases', () => {
    test('Gallery promotion should have required fields', async ({ request }) => {
      const response = await request.get(API_URL);
      const data = await response.json();
      
      const galleryPromotion = data.Promotions.find(
        (promotion: { Name: string }) => promotion.Name === 'Gallery'
      );
      
      expect(galleryPromotion).toHaveProperty('Name');
      expect(galleryPromotion).toHaveProperty('Description');
      expect(galleryPromotion.Description).not.toBe('');
    });

    test('Response structure should be valid', async ({ request }) => {
      const response = await request.get(API_URL);
      const data = await response.json();
      
      expect(data).toHaveProperty('Name');
      expect(data).toHaveProperty('CanRelist');
      expect(data).toHaveProperty('Promotions');
      expect(Array.isArray(data.Promotions)).toBe(true);
      expect(data.Promotions.length).toBeGreaterThan(0);
    });

    test('Data types should be correct', async ({ request }) => {
      const response = await request.get(API_URL);
      const data = await response.json();
      
      expect(typeof data.Name).toBe('string');
      expect(typeof data.CanRelist).toBe('boolean');
      expect(Array.isArray(data.Promotions)).toBe(true);
    });
  });

  test.describe('Negative Cases', () => {
    test('Invalid category ID should not return success', async ({ request }) => {
      const invalidUrl = 'https://api.tmsandbox.co.nz/v1/Categories/99999999/Details.json?catalogue=false';
      const response = await request.get(invalidUrl);
      
      expect(response.status()).not.toBe(200);
    });

    test('Gallery promotion must exist', async ({ request }) => {
      const response = await request.get(API_URL);
      const data = await response.json();
      
      const galleryExists = data.Promotions.some(
        (promotion: { Name: string }) => promotion.Name === 'Gallery'
      );
      
      expect(galleryExists).toBe(true);
    });

    test('Name should match exactly (case-sensitive)', async ({ request }) => {
      const response = await request.get(API_URL);
      const data = await response.json();
      
      expect(data.Name).not.toBe('carbon credits');
      expect(data.Name).not.toBe('Carbon Credits');
    });

    test('CanRelist should not be false', async ({ request }) => {
      const response = await request.get(API_URL);
      const data = await response.json();
      
      expect(data.CanRelist).toBe(true);
      expect(data.CanRelist).not.toBe(false);
    });

    test('Response should not be null or empty', async ({ request }) => {
      const response = await request.get(API_URL);
      const data = await response.json();
      
      expect(data).not.toBeNull();
      expect(Object.keys(data).length).toBeGreaterThan(0);
      expect(data.Name).not.toBeNull();
      expect(data.Name).not.toBe('');
    });
  });

  test.describe('Data Consistency', () => {
    test('API response should be consistent across requests', async ({ request }) => {
      const response1 = await request.get(API_URL);
      const data1 = await response1.json();
      
      const response2 = await request.get(API_URL);
      const data2 = await response2.json();
      
      expect(data1.Name).toBe(data2.Name);
      expect(data1.CanRelist).toBe(data2.CanRelist);
    });
  });
});
