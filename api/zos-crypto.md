# @zos/crypto

**7 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `AESCrypto` | value | not stated | OFFICIAL |
| `alg` | constant | not stated | OFFICIAL |
| `CRCCrypto` | value | not stated | OFFICIAL |
| `DigestCrypto` | value | not stated | OFFICIAL |
| `ECDSACrypto` | value | not stated | OFFICIAL |
| `ecp_dp` | constant | not stated | OFFICIAL |
| `encryptKey` | function | >= 3 | OFFICIAL |

`not stated` means no source documents a minimum for that symbol — not that it works on any level.

## Symbols in detail

### `@zos/crypto.AESCrypto`

```ts
function createCrypto(algorithmId: typeof alg.AES_CBC, option: AESOptions): AESCrypto | undefined
```

**AESOptions**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `key_bit_length` | `number` | not stated | — | Key length in bits; AES-CBC uses 128 |
| `key_encrypt` | `boolean&#124;number` | not stated | — | Whether the key is encrypted again by the hardware key |
| `private_key` | `AESData` | not stated | — | Existing private key; use it instead of generating a new key |

**AESKeyResult**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `private_key_length` | `number` | not stated | — | Private key length |
| `private_key` | `ArrayBuffer` | not stated | — | Private key data |

**AESCipherResult**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `data` | `ArrayBuffer` | not stated | — | Encrypted data |
| `length` | `number` | not stated | — | Data length |

**AESCipherResult**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `data` | `ArrayBuffer` | not stated | — | Decrypted data |
| `length` | `number` | not stated | — | Data length |

### `@zos/crypto.alg`

**alg**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `alg.ECDSA` | >= 3 | ECDSA digital signature |

### `@zos/crypto.CRCCrypto`

```ts
function createCrypto(algorithmId: typeof alg.CRC16 | typeof alg.CRC32): CRCCrypto | undefined
```

**CRCResult**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `data` | `ArrayBuffer` | not stated | — | CRC checksum in little-endian form |
| `length` | `number` | not stated | — | Data length |

### `@zos/crypto.DigestCrypto`

```ts
function createCrypto(
  algorithmId: typeof alg.MD5 | typeof alg.SHA_256 | typeof alg.SHA_1,
  option?: DigestOptions,
): DigestCrypto | undefined
function createCrypto(
  algorithmId: typeof alg.HMACMD5 | typeof alg.HMAC_SHA_256 | typeof alg.HMAC_SHA_1,
  option: HMACOptions,
): DigestCrypto | undefined
```

**DigestOptions**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `key_encrypt` | `boolean&#124;number` | not stated | — | Whether the key is encrypted again by the hardware key |

**HMACOptions**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `private_key` | `DigestData` | not stated | — | Key used by HMAC algorithms |
| `key_encrypt` | `boolean&#124;number` | not stated | — | Whether the key is encrypted again by the hardware key |

**DigestResult**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `md_content` | `ArrayBuffer` | not stated | — | Digest data |
| `length` | `number` | not stated | — | Digest length |

**DigestResult**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `md_content` | `ArrayBuffer` | not stated | — | Digest data |
| `length` | `number` | not stated | — | Digest length |

### `@zos/crypto.ECDSACrypto`

```ts
function createCrypto(algorithmId: typeof alg.ECDSA, option?: ECDSAOptions): ECDSACrypto | undefined
```

**ECDSAOptions**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `ecp_dp_mode` | `typeof ecp_dp.SECP192K1&#124;typeof ecp_dp.SECP224K1&#124;typeof ecp_dp.SECP256K1` | not stated | — | Elliptic curve parameter; defaults to ecp_dp.SECP256K1 |
| `key_encrypt` | `boolean&#124;number` | not stated | — | Whether the key is encrypted again by the hardware key |
| `private_key` | `ECDSAData` | not stated | — | Existing private key |
| `pub_key` | `ECDSAData` | not stated | — | Existing public key |

**ECDSAKeyResult**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `private_key_length` | `number` | not stated | — | Private key length |
| `private_key` | `ArrayBuffer` | not stated | — | Private key data |
| `pub_key_length` | `number` | not stated | — | Public key length |
| `pub_key` | `ArrayBuffer` | not stated | — | Public key data |

**Options**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `digest_type` | `typeof alg.MD5&#124;typeof alg.HMACMD5` | not stated | — | Digest algorithm; supports alg.MD5 and alg.HMACMD5 |

**ECDSACipherResult**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `data` | `ArrayBuffer` | not stated | — | Digital signature data |
| `length` | `number` | not stated | — | Data length |

**Options**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `sig_data` | `createCrypto.ECDSAData` | not stated | — | Digital signature to verify |

**ECDSACipherResult**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `data` | `ArrayBuffer` | not stated | — | Signature verification result data |
| `length` | `number` | not stated | — | Data length |

### `@zos/crypto.ecp_dp`

**ecp_dp**

| Value | Min API_LEVEL | Description |
| --- | --- | --- |
| `ecp_dp.SECP192K1` | >= 3 | SECP192K1 elliptic curve |
| `ecp_dp.SECP224K1` | >= 3 | SECP224K1 elliptic curve |
| `ecp_dp.SECP256K1` | >= 3 | SECP256K1 elliptic curve; default |

### `@zos/crypto.encryptKey`

Encrypt data with the firmware PUF hardware module using AES. Input length must be a multiple of 16 bytes; returns `undefined` on failure.

```ts
function encryptKey(data: CryptoData): ArrayBuffer | undefined
```
