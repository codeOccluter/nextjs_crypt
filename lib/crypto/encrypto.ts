import { modularPower } from "./generateKeys"

export function encrpyt(message: bigint, publicKey: { e: bigint, n: bigint }): bigint {

    return modularPower(message, publicKey.e, publicKey.n)
}