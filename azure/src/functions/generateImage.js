const { app } = require('@azure/functions');
const openai = require("../../lib/openai")
const axios = require("axios")
const genetateSASToken = require("../../lib/generateSASToken")

const { BlobServiceClient } = require("@azure/storage-blob")

const accountName = process.env.accountName

const containerName = "images"

app.http('generateImage', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request) => {
        const { prompt } = await request.json();

        const res = await openai.createImage({
            prompt,
            n: 1,
            size: "1024x1024"
        })

        const image_url = res.data.data[0].url

        const response = await axios.get(image_url, { responseType: "arraybuffer" })

        const arrayBuffer = response.data;

        const sasToken = await genetateSASToken();

        const blobServiceClient = new BlobServiceClient(
            `https://${accountName}.blob.core.windows.net?${sasToken}`
        )

        const containerClient = blobServiceClient.getContainerClient(containerName)
        
        const timestamp = new Date().getTime();
        const file_name = `${prompt}_${timestamp}.png`

        const blockBlobClient = containerClient.getBlockBlobClient(file_name)

        try {
            await blockBlobClient.uploadData(arrayBuffer)
            console.log("Uploaded successfully");
        }catch(err) {
            console.log("Error uploading", err.message);
        }

        return {body: "Successfully Upoaded Image"}

    }
});