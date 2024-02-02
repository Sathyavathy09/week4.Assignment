import {test, chromium, expect,Page} from "@playwright/test";
import { title } from "process";
test("Merge Contact", async({page,context}) =>{

// 1. Launch URL "http://leaftaps.com/opentaps/control/login"
await page.goto("http://leaftaps.com/opentaps/control/main");
// 2. Enter UserName and Password Using Id Locator
await page.locator("#username").fill("Demosalesmanager");
await page.locator("#password").fill("crmsfa");
// 3. Click on Login Button using Class Locator
await page.locator(".decorativeSubmit").click();
// 4. Click on CRM/SFA Link
await page.locator("text=CRM/SFA").click();
// 5. Click on contacts Button
await page.locator("[href='/crmsfa/control/contactsMain']").click();
// 6. Click on Merge Contacts using Xpath Locator
await page.getByRole('link',{name:'Merge Contacts'}).click();
// 7. Click on Widget of From
const [newWindow] = await Promise.all([
    context.waitForEvent("page"),
    page.locator("[src='/images/fieldlookup.gif']").nth(0).click()
])
//const newPage = newWindow[0];
console.log(newWindow.url());
// 8. Click on First Resulting Contact
await newWindow.locator("[class='x-grid3-cell-inner x-grid3-col-partyId']").nth(0).click();
//newWindow.close();
// 9. Click on Widget of To Contact
const [newWindow1] = await Promise.all([
    context.waitForEvent("page"),
    page.locator("[src='/images/fieldlookup.gif']").nth(1).click()
])
// 10. Click on Second Resulting Contact
await newWindow1.locator("[class='x-grid3-cell-inner x-grid3-col-partyId']").nth(0).click();
newWindow1.close();
// 11. Click on Merge button using Xpath Locator
await page.locator(".buttonDangerous").click();
// 12. Accept the Alert
await page.on("dialog",async dialog =>
{
    dialog.accept();
})
// 13. Verify the title of the page
const pageTitle = await page.title();
expect (pageTitle).toContain("Merge Contacts");  

})

test("ServiceNow -Ordering Mobile", async({page,context}) =>{

// 1. Launch ServiceNow application
await page.goto("https://dev217372.service-now.com");
// 2. Login with valid credentials 
await page .locator("[name='user_name']").fill("admin");
await page.locator("#user_password").fill("Elamaran@123");
await page.locator("#sysverb_login").click();

// 3. Click-All Enter Service catalog in filter navigator and press enter or Click the ServiceCatalog
await page.locator("[aria-label='All']").click();
await page.locator("text=Service Catalog").click();

// 4. Click on  mobiles
const selectFrame = page.frameLocator("#gsft_main");
await selectFrame.getByRole('link', { name: 'Mobiles', exact: true }).click();

// 5. Select Apple iphone13pro
await selectFrame.getByRole('link', { name: 'Apple iPhone 13', exact: true }).click();
// 6. Choose yes option in lost or broken iPhone
await selectFrame.locator('text=Yes').click();

// 7. Enter phonenumber as 99 in original phonenumber field
await selectFrame.getByRole('heading', { name: 'What was the original phone' }).fill("99")

// 8. Select Unlimited from the dropdown in Monthly data allowance
await selectFrame.locator("select.form-control.cat_item_option").selectOption("Unlimited");
//await selectFrame.locator("options[value='Unlimited']").click();
// 9. Update color field to SierraBlue and storage field to 512GB
await selectFrame.locator('text=Blue').click();
await selectFrame.getByText('Storage capacity: 128 GB, 256').click();
// 10. Click on Order now option
await selectFrame.getByRole('button',{name: 'Order Now'}).click();

// 11. Verify order is placed
const message = await selectFrame.locator("span[aria-live='assertive']").innerText();
console.log(message);
expect (message).toContain("Thank you, your request has been submitted")



})

