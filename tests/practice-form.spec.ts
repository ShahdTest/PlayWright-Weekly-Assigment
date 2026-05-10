import { test, expect } from '@playwright/test';
import path from 'path';

test('demoqa practice form - simple working test', async ({ page }) => {

  const userData = {
    firstName: 'QA',
    lastName: 'Admin',
    email: 'qa_admin@itgsoftware.com',
    gender: 'Female',
    mobile: '0598200330',
    subject: 'Maths',
    hobby: 'Sports',
    address: 'Rafedia Street',
    state: 'NCR',
    city: 'Delhi',
    imageName: 'sample-image.png'
  };

  await page.goto('https://demoqa.com/automation-practice-form');

  // Remove ads
  await page.evaluate(() => {
    document.querySelector('#fixedban')?.remove();
    document.querySelector('footer')?.remove();
  });

  // Fill basic fields
  await page.locator('#firstName').fill(userData.firstName);
  await page.locator('#lastName').fill(userData.lastName);
  await page.locator('#userEmail').fill(userData.email);
  await page.locator(`label:text-is("${userData.gender}")`).click();
  await page.locator('#userNumber').fill(userData.mobile);

  // Date of birth (fixed value)
  await page.locator('#dateOfBirthInput').click();
  await page.locator('.react-datepicker__month-select').selectOption('June');
  await page.locator('.react-datepicker__year-select').selectOption('1991');
  await page.locator('.react-datepicker__day--029:not(.react-datepicker__day--outside-month)').click();

  // Subject
  await page.locator('#subjectsInput').fill(userData.subject);
  await page.keyboard.press('Enter');

  // Hobby (FIXED direct selector)
  await page.locator('label[for="hobbies-checkbox-1"]').click();

  // Upload file (make sure file exists)
  const filePath = path.join(process.cwd(), 'test-data', userData.imageName);
  await page.locator('#uploadPicture').setInputFiles(filePath);

  // Address
  await page.locator('#currentAddress').fill(userData.address);

  // State & City
  await page.locator('#state').click();
  await page.getByText(userData.state).click();

  await page.locator('#city').click();
  await page.getByText(userData.city).click();

  // Submit
  await page.locator('#submit').click();

  // Assertion
  await expect(page.locator('.modal-content')).toBeVisible();
});