import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

const { chromium } = require('playwright');
dotenv.config();
const BASE_URL = process.env.BASE_URL as string;
const DNI_VALIDO = process.env.DNI_VALIDO as string;
const PASS = process.env.PASS as string;
const SEGUNDAURL = process.env.SEGUNDAURL as string;



  test('Caso fallido: no se especifica el destinatario para la constancia', async ({ page }) => {
    const browser = await chromium.launch({
      headless: false
    });
    const context = await browser.newContext();
     //pre requisito
    await page.goto(BASE_URL);
    await page.pause(); 
    await page.locator('[placeholder="Usuario"]').fill(DNI_VALIDO);

    await page.locator('[placeholder="Contraseña"]' ).fill(PASS);

    await page.getByRole('button', { name: 'Submit' }).click();
    await context.close();
    await expect(page).toHaveURL(`${BASE_URL}Proteccion/Inicio.aspx`);
    await browser.close();
    //caso prueba
    await page.getByText('Trámites', { exact: true }).click();
    
    
    await page.getByRole('link', { name: 'Solicitar Trámite' }).click();

    await page.getByRole('link', { name: 'Constancia de alumno regular.' }).click();
    await page.getByRole('button', { name: 'Solicitar' }).click();
    await page.getByText('El campo Dirigido a no puede').click();
  
  await context.close();
  await browser.close();
  

    
  

  });

  test('Caso valido', async ({ page }) =>  {
    const browser = await chromium.launch({
        headless: false
      });
      const context = await browser.newContext();
  
      await page.goto(BASE_URL);
      await page.pause(); 
      await page.locator('[placeholder="Usuario"]').fill(DNI_VALIDO);
  
      await page.locator('[placeholder="Contraseña"]' ).fill(PASS);
  
      await page.getByRole('button', { name: 'Submit' }).click();
      await context.close();
      await expect(page).toHaveURL(`${BASE_URL}Proteccion/Inicio.aspx`);
     

      await page.getByText('Trámites', { exact: true }).click();
      
      
      await page.getByRole('link', { name: 'Solicitar Trámite' }).click();
     
      await page.getByRole('link', { name: 'Constancia de alumno regular.' }).click();
      
      await page.locator('#ctl00_ContentPlaceHolder1_cboDirigidoA_Input').click();
      await page.getByText('A QUIEN CORRESPONDA', { exact: true }).click();
      await page.getByRole('button', { name: 'Solicitar' }).click();
      await page.getByText('Trámite solicitado').click();


     

  });


