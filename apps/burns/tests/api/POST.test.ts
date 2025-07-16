import { APIActions } from '@lib/APIActions';
import test from '@burnsBase';

const apiActions = new APIActions();

test(`SCRUM-T4 postUsers`, { tag: '@API'}, async ({ request }) => {

    //* Body Response Params and Body Response Headers are stored in single text file separated by #
    const requestBody = JSON.parse((await apiActions.readValuesFromTextFile('./apps/burns/utils/api/postUsers.txt')).split(`#`)[0]);
  const response = await request.post('/api/users', {
    headers: {
      'x-api-key': 'reqres-free-v1',
      'Content-Type': 'application/json',
    },
    data: requestBody,
  });
    await apiActions.verifyStatusCode(response);

    const responseBodyParams = (await apiActions.readValuesFromTextFile('./apps/burns/utils/api/postUsers.txt')).split(`#`)[1];
    await apiActions.verifyResponseBody(responseBodyParams, await response.json(), `Response Body`);
});

