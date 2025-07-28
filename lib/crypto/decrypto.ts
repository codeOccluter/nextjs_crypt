import { modularPower } from "./generateKeys"

export function decrypt(chiper: bigint, privateKey: { d: bigint, n: bigint }): bigint {

    return modularPower(chiper, privateKey.d, privateKey.n)
}