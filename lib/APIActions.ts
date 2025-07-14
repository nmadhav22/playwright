import fs from 'fs';
import { APIResponse, expect } from '@playwright/test';

export class APIActions {

  async verifyStatusCode(response: APIResponse): Promise<void> {
    await expect(response).toBeOK();
  }

  async verifyResponseBody(expectedResponseBodyParams: string, responsePart: JSON, responseType: string): Promise<void> {
    let status = true;
    let fieldNames = `Parameter`;
    const headers = expectedResponseBodyParams.split("|");
    const responseToString = JSON.stringify(responsePart).trim();
    for (let headerKey of headers) {
      if (!(responseToString.includes(headerKey.trim()))) {
        status = false;
        fieldNames = fieldNames + `, ` + headerKey;
        break;
      }
    }
    expect(status).toBe(true);
  }

  async verifyResponseHeader(expectedResponseHeaderParams: string, responsePart: Array<{ name: string, value: string }>, responseType: string): Promise<void> {
    let status = true;
    let fieldNames = `Parameter`;
    for (let responseKey of responsePart) {
      if (!(expectedResponseHeaderParams.includes(responseKey.name.trim()))) {
        status = false;
        fieldNames = fieldNames + ' ,' + responseKey.name;
        break;
      }
    }
    expect(status, `${fieldNames} was not present in ${responseType}`).toBe(true);
  }

  async readValuesFromTextFile(filePath: string): Promise<string> {
    return fs.readFileSync(filePath, `utf8`);
  }
}