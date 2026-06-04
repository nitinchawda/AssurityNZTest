import { test, expect } from '@playwright/test';

test.describe('Carbon Credits API Tests', () => {
  const API_URL = 'https://api.tmsandbox.co.nz/v1/Categories/6327/Details.json?catalogue=false';

  test('API returns valid JSON response', async ({ request }) => {
    const response = await request.get(API_URL);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toBeDefined();
  });

  test('Name should be "Carbon credits"', async ({ request }) => {
    const response = await request.get(API_URL);
    const data = await response.json();
    expect(data.Name).toBe('Carbon credits');
  });

  test('CanRelist should be true', async ({ request }) => {
    const response = await request.get(API_URL);
    const data = await response.json();
    expect(data.CanRelist).toBe(true);
  });

  test('Promotions element with Name "Gallery" should have Description containing "Good position in category"', async ({ request }) => {
    const response = await request.get(API_URL);
    const data = await response.json();
    
    expect(data.Promotions).toBeDefined();
    expect(Array.isArray(data.Promotions)).toBe(true);
    
    const galleryPromotion = data.Promotions.find((promotion: { Name: string }) => promotion.Name === 'Gallery');
    expect(galleryPromotion).toBeDefined();
    expect(galleryPromotion.Description).toContain('Good position in category');
  });
});
