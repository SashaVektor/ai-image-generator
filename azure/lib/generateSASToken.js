const { 
    BlobServiceClient, StorageSharedKeyCredential,
    BlobSASPermissions, generateBlobSASQueryParameters 
} = require("@azure/storage-blob")

const accountName = process.env.accountName
const accountKey = process.env.accountKey
const containerName = "images"

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey)

const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
)

async function genetateSASToken() {
    const containerClient = blobServiceClient.getContainerClient(containerName)

    const premissions = new BlobSASPermissions();

    premissions.write = true
    premissions.create = true
    premissions.read = true

    const expiryDate = new Date();

    expiryDate.setMinutes(expiryDate.getMinutes() + 30)

    const sasToken = generateBlobSASQueryParameters({
        containerName: containerClient.containerName,
        permissions: premissions.toString(),
        expiresOn: expiryDate
    },
    sharedKeyCredential
    ).toString()

    return sasToken
}

module.exports = genetateSASToken