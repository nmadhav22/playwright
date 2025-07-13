import { APIActions } from '@lib/APIActions';
import test from '@app1Base';

const apiActions = new APIActions();

test(`getUsers`, { tag: '@API'}, async ({ request }) => {
    const response = await request.get(`/api/users?per_page=1`, {
        headers: {
            'x-api-key': 'reqres-free-v1'
        }
    });

    await apiActions.verifyStatusCode(response);

    //* Body Response Params and Body Response Headers are stored in single text file separated by #
    const responseBodyParams = (await apiActions.readValuesFromTextFile('./apps/app1/utils/api/getUsers.txt')).split(`#`)[0];
    await apiActions.verifyResponseBody(responseBodyParams, await response.json(), `Response Body`);
});
