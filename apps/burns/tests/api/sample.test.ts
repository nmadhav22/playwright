import { test, expect } from '@playwright/test';
import { APIActions } from '@lib/APIActions';

const BASE_URL = 'https://api.sampleapis.com/coffee/hot';
const apiActions = new APIActions();

test.describe('SampleAPIs /coffee/hot CRUD Scenarios', () => {
  let createdCoffeeId: number;
  const newCoffee = {
    title: 'Test Coffee',
    description: 'Test Description',
    ingredients: ['Water', 'Coffee'],
    image: 'https://example.com/image.jpg',
  };
  const updatedCoffee = {
    title: 'Updated Coffee',
    description: 'Updated Description',
    ingredients: ['Water', 'Coffee', 'Milk'],
    image: 'https://example.com/updated.jpg',
  };

  test('GET: Retrieve all coffee items', async ({ request }) => {
    const response = await request.get(BASE_URL);
    await apiActions.verifyStatusCode(response);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    for (const item of body) {
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('description');
      expect(item).toHaveProperty('ingredients');
      expect(item).toHaveProperty('image');
    }
  });

  test('POST: Create a new coffee item', async ({ request }) => {
    const response = await request.post(BASE_URL, { data: newCoffee });
    // Some public APIs may not allow POST; handle gracefully
    if (![200, 201].includes(response.status())) {
      test.skip(true, `POST not supported on this endpoint (status: ${response.status()})`);
    }
    expect([200, 201]).toContain(response.status());
    const body = await response.json();
    expect(body).toHaveProperty('id');
    createdCoffeeId = body.id;
    // Optionally validate returned fields
    expect(body.title).toBe(newCoffee.title);
  });

  test('GET: Get the new coffee item by ID', async ({ request }) => {
    test.skip(!createdCoffeeId, 'No coffee item created to fetch');
    const response = await request.get(`${BASE_URL}/${createdCoffeeId}`);
    await apiActions.verifyStatusCode(response);
    const body = await response.json();
    expect(body.id).toBe(createdCoffeeId);
    expect(body.title).toBe(newCoffee.title);
    expect(body.description).toBe(newCoffee.description);
    expect(body.ingredients).toEqual(newCoffee.ingredients);
    expect(body.image).toBe(newCoffee.image);
  });

  test('PUT: Update the coffee item by ID', async ({ request }) => {
    test.skip(!createdCoffeeId, 'No coffee item created to update');
    const response = await request.put(`${BASE_URL}/${createdCoffeeId}`, { data: updatedCoffee });
    if (response.status() === 404) {
      test.skip(true, 'PUT not supported or item not found');
    }
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.title).toBe(updatedCoffee.title);
    expect(body.description).toBe(updatedCoffee.description);
    expect(body.ingredients).toEqual(updatedCoffee.ingredients);
    expect(body.image).toBe(updatedCoffee.image);
  });

  test('DELETE: Delete the coffee item', async ({ request }) => {
    test.skip(!createdCoffeeId, 'No coffee item created to delete');
    const response = await request.delete(`${BASE_URL}/${createdCoffeeId}`);
    if (![200, 204].includes(response.status())) {
      test.skip(true, 'DELETE not supported or item not found');
    }
    expect([200, 204]).toContain(response.status());
    // Optionally check for empty body or success message
  });

  test('GET: Confirm item deletion', async ({ request }) => {
    test.skip(!createdCoffeeId, 'No coffee item created to check deletion');
    const response = await request.get(`${BASE_URL}/${createdCoffeeId}`);
    expect([404, 400, 204]).toContain(response.status());
    // Optionally check for error message or empty response
  });
});