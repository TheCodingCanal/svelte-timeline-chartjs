import { defineConfig, expect, test } from '@playwright/test';
import type { Locator } from 'playwright';

export default defineConfig({
	webServer: {
		command: 'npm run dev',
		url: 'http://localhost:5173/'.toString()
	},
	use: {
		baseURL: 'http://localhost:5173/'
	}
});

test('When bar is clicked with time data being 2022-10-02T12:00 and 2022-10-07T18:00 then onClick function is called.', async ({
	page
}) => {
	const stringUrl: string = 'http://localhost:5173/'.toString();
	await page.goto(stringUrl);

	await page.waitForTimeout(100);

	const barChart: Locator = page.getByTestId('barChart');
	await expect(barChart).toBeVisible();

	await page.getByTestId('barChart').click({
		button: 'left',
		position: { x: 669, y: 240 }
	});

	await expect(page.getByText('adjective')).toBeVisible();
});
