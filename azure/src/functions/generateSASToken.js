const { app } = require('@azure/functions');
const genetateSASToken= require("../../lib/generateSASToken")

app.http('getSasToken', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const sasToken = await genetateSASToken();

        return {body: sasToken}
    }
});