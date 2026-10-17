import { test, expect } from '../fixtures/garage.fixture';

test.describe('Garage', () => {
    test('should add a car', async ({ userGaragePage }) => {
        const brand = 'Audi';
        const model = 'TT';
        const mileage = '1000';

        await userGaragePage.addCar(
            brand,
            model,
            mileage
        );

        await expect(
            userGaragePage.getCar(`${brand} ${model}`)
        ).toBeVisible();
    });
});