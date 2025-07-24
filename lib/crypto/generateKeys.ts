import forge from "node-forge"

export function generateRSAkeyPair(): {
    publicKeyPem: string
    privateKeyPem: string
} {
    const keypair = forge.pki.rsa.generateKeyPair(2048)
    const privatePem = forge.pki.privateKeyToPem(keypair.privateKey)
    const publicPem = forge.pki.publicKeyToPem(keypair.publicKey)

    return {
        privateKeyPem: privatePem,
        publicKeyPem: publicPem
    }
}