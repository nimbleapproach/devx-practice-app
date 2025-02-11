import { test, expect } from '@playwright/test';

const testUser = "testuser750";

test('signup', async ({ page }) => {
  await page.goto('http://localhost:3000/signup');

  const randomUserNumber = Math.floor(Math.random() * 1000);

  await page.fill('input#username', `testuser${randomUserNumber}`);
  await page.fill('input#email', `testuser${randomUserNumber}@example.com`);
  await page.fill('input#password', 'password');
  await page.click('button[type="submit"]');

  // Expect to be redirected to the login page
  await expect(page).toHaveURL('http://localhost:3000/login');
});

test('login', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  await page.fill('input#username', testUser);
  await page.fill('input#password', 'password');
  await page.click('button[type="submit"]');

  // Expect to be redirected to the dashboard
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
});

test('logout', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  await page.fill('input#username', testUser);
  await page.fill('input#password', 'password');
  await page.click('button[type="submit"]');

  // Expect to be redirected to the dashboard
  await expect(page).toHaveURL('http://localhost:3000/dashboard');

  await page.click('a[href="/logout"]');

  // Expect to be redirected to the homepage
  await expect(page).toHaveURL('http://localhost:3000/');
});

test('view dashboard', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  await page.fill('input#username', testUser);
  await page.fill('input#password', 'password');
  await page.click('button[type="submit"]');

  // Expect to be redirected to the dashboard
  await expect(page).toHaveURL('http://localhost:3000/dashboard');

  // Expect to see the dashboard heading
  await expect(page.getByText('Welcome to your dashboard!')).toBeVisible();
});

test('add transaction', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  await page.fill('input#username', testUser);
  await page.fill('input#password', 'password');
  await page.click('button[type="submit"]');

  // Expect to be redirected to the dashboard
  await expect(page).toHaveURL('http://localhost:3000/dashboard');

  await page.click('a[href="/add-transaction"]');

  await page.fill('input#amount', '100');
  await page.fill('input#description', 'Test transaction');
  await page.click('button[type="submit"]');

  // Expect to be redirected to the dashboard
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
});