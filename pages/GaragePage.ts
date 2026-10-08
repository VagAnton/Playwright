export class GaragePage {
    constructor(page) {
        this.page = page;

        this.addCarButton = page.getByRole('button', { name: 'Add car' });
        this.brandSelect = page.locator('#addCarBrand');
        this.modelSelect = page.locator('#addCarModel');
        this.mileageInput = page.locator('#addCarMileage');
        this.addButton = page.locator('.modal-footer button.btn-primary');
    }

    async open() {
        await this.page.goto('/panel/garage');
    }

    async addCar(brand, model, mileage) {
        await this.addCarButton.click();

        await this.brandSelect.selectOption({ label: brand });
        await this.modelSelect.selectOption({ label: model });
        await this.mileageInput.fill(mileage);

        await this.addButton.click();
    }

    getCar(carName) {
        return this.page.locator('.car.jumbotron').filter({
            hasText: carName,
        });
    }
}