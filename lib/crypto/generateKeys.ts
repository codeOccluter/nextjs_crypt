import crypto from "crypto"

export function randomBigInt(bits: number): bigint {

    const bytes = Math.ceil(bits / 8)
    const buf = crypto.randomBytes(bytes)

    let hex = "0x" + buf.toString("hex")

    return BigInt(hex)
}

// 모듈러의 거듭제곱
export function modularPower(base: bigint, exp: bigint, mod: bigint): bigint {

    let result = 1n
    base = base % mod

    while(exp > 0n) {
        if(exp & 1n) result = (result * base) % mod

        base = (base * base) % mod
        exp >>= 1n
    }

    return result
}

// Miller-Rabin의 소수 판별 알고리즘
export function isProbablyPrime(n: bigint, k: number = 40): boolean {

    if(n === 2n || n === 3n) return true
    if(n < 2n || n % 2n === 0n) return false

    let r = 0n
    let d = n - 1n

    while(d % 2n === 0n) {
        d /= 2n
        r++
    }

    witnessLoop: for (let i = 0; i < k; i++) {

        const a = 2n + (randomBigInt(n.toString(2).length) % (n - 3n))
        let x = modularPower(a, d, n)

        if(x === 1n || x === n - 1n) continue
        for(let j = 1n; j < r; j++) {

            x = modularPower(x, 2n, n)
            if(x === n - 1n) continue witnessLoop
        }
        return false
    }
    return true
}

export function generatePrimeNumber(bits: number = 1024): bigint {

    let p: bigint
    
    do {
        p = randomBigInt(bits) | 1n
    }while (!isProbablyPrime(p))

    return p
}

function gcd(a: bigint, b: bigint): bigint {
    return b === 0n ? a: gcd(b, a % b)
}

function modularInverse(a: bigint, m: bigint): bigint {

    let m0 = m
    let x0 = 0n
    let x1 = 1n
    
    while(a > 1n) {
        const q = a / m
        const newA = m
        const newM = a % m

        a = newA
        m = newM

        const newX0 = x1 - q * x0
        x1 = x0
        x0 = newX0
    }
    return x1 < 0n ? x1 + m0 : x1
}

export function generateRSAKeys(bits: number = 2048) {

    const e = 65337n
    let p: bigint, q: bigint, n: bigint, phi: bigint

    do {
        p = generatePrimeNumber(bits / 2)
        q = generatePrimeNumber(bits / 2)
        n = p * q
        phi = (p - 1n) * (q - 1n)
    }while (gcd(e, phi) !== 1n)

    const d = modularInverse(e, phi)
    
    return { publicKey: { e, n }, privateKey: { d, n } }
}