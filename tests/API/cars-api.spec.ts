import {
  test,
  expect,
  request,
  APIRequestContext,
} from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const authFile = 'playwright/.auth/user.json';

let apiContext: APIRequestContext;
let carId: number;

test.describe.serial('Cars API', () => {
  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: process.env.BASE_URL,
      storageState: authFile,
      httpCredentials: {
        username: process.env.QAUTO_USERNAME!,
        password: process.env.QAUTO_PASSWORD!,
      },
    });
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('Add a car using saved storage state', async () => {
    const response = await apiContext.post('/api/cars', {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 100,
      },
    });

    expect(
      response.status(),
      await response.text()
    ).toBe(201);

    const body = await response.json();
    const car = body.data ?? body;

    expect(car.id).toBeDefined();
    carId = car.id;

    expect(car.carBrandId).toBe(1);
    expect(car.carModelId).toBe(1);
  });

  test('Delete the created car using saved storage state', async () => {
    expect(carId).toBeDefined();

    const response = await apiContext.delete(`/api/cars/${carId}`);

    expect(response.ok()).toBeTruthy();

    const listResponse = await apiContext.get('/api/cars');
    expect(listResponse.ok()).toBeTruthy();

    const body = await listResponse.json();
    const cars = body.data ?? body;

    expect(
      cars.some((car: { id: number }) => car.id === carId)
    ).toBe(false);
  });
});
