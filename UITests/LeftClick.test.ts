import { test, expect, defineConfig } from '@playwright/test';
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

	const barChart: Locator = page.getByTestId('barChart');
	await expect(barChart).toBeVisible();

	await page.getByTestId('barChart').click({
		button: 'left',
		position: { x: 689, y: 229 }
	});

	await expect(page.getByText('adjective')).toBeVisible();
});
