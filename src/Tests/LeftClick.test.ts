import {test, expect, defineConfig} from '@playwright/test';


export default defineConfig({
    webServer:{
        command: 'npm run dev',
        url: 'http://localhost:5173/'
    }
})
test ('When bar is clicked with time data being 2022-10-02T12:00 and 2022-10-07T18:00 then onClick function is called.', async({page}) =>{
    const stringUrl: string = "http://localhost:5173/".toString();
    console.log(stringUrl);
    await page.goto(stringUrl);
    await page.locator('canvas').click({
     position: {x: 1296, y: 437}
    })
    await expect(page.getByRole('alert', {name: "ModalSample"})).toBeVisible();
});