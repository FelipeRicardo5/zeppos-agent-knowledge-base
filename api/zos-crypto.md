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

**Called on a `AESCrypto` value** — 3 members

| Member | Signature |
| --- | --- |
| [`createChiper`](#zoscryptoaescryptocreatechiper) | `createChiper(): AESKeyResult | undefined` |
| [`encrypt`](#zoscryptoaescryptoencrypt) | `encrypt(data: createCrypto.AESData): AESCipherResult | undefined` |
| [`decrypt`](#zoscryptoaescryptodecrypt) | `decrypt(data: createCrypto.AESData): AESCipherResult | undefined` |

#### `@zos/crypto.AESCrypto.createChiper`

Create or return the AES private key; returns `undefined` on failure

```ts
createChiper(): AESKeyResult | undefined
```

**AESKeyResult**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `private_key_length` | `number` | not stated | — | Private key length |
| `private_key` | `ArrayBuffer` | not stated | — | Private key data |

#### `@zos/crypto.AESCrypto.encrypt`

Encrypt data whose length is a multiple of 16 bytes

```ts
encrypt(data: createCrypto.AESData): AESCipherResult | undefined
```

**AESCipherResult**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `data` | `ArrayBuffer` | not stated | — | Encrypted data |
| `length` | `number` | not stated | — | Data length |

#### `@zos/crypto.AESCrypto.decrypt`

Decrypt AES-CBC data

```ts
decrypt(data: createCrypto.AESData): AESCipherResult | undefined
```

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

**Called on a `CRCCrypto` value** — 1 members

| Member | Signature |
| --- | --- |
| [`encrypt`](#zoscryptocrccryptoencrypt) | `encrypt(data: createCrypto.CRCData): CRCResult | undefined` |

#### `@zos/crypto.CRCCrypto.encrypt`

Calculate a CRC checksum in little-endian form

```ts
encrypt(data: createCrypto.CRCData): CRCResult | undefined
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

**Called on a `DigestCrypto` value** — 4 members

| Member | Signature |
| --- | --- |
| [`encrypt`](#zoscryptodigestcryptoencrypt) | `encrypt(data: createCrypto.DigestData): DigestResult | undefined` |
| [`start`](#zoscryptodigestcryptostart) | `start(): void` |
| [`update`](#zoscryptodigestcryptoupdate) | `update(data: createCrypto.DigestData): void` |
| [`finish`](#zoscryptodigestcryptofinish) | `finish(): DigestResult | undefined` |

#### `@zos/crypto.DigestCrypto.encrypt`

Calculate a digest in one call

```ts
encrypt(data: createCrypto.DigestData): DigestResult | undefined
```

**DigestResult**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `md_content` | `ArrayBuffer` | not stated | — | Digest data |
| `length` | `number` | not stated | — | Digest length |

#### `@zos/crypto.DigestCrypto.start`

Start streaming digest calculation

```ts
start(): void
```

#### `@zos/crypto.DigestCrypto.update`

Append a data chunk

```ts
update(data: createCrypto.DigestData): void
```

#### `@zos/crypto.DigestCrypto.finish`

Finish streaming calculation and return the digest

```ts
finish(): DigestResult | undefined
```

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

**Called on a `ECDSACrypto` value** — 3 members

| Member | Signature |
| --- | --- |
| [`createChiper`](#zoscryptoecdsacryptocreatechiper) | `createChiper(): ECDSAKeyResult | undefined` |
| [`encrypt`](#zoscryptoecdsacryptoencrypt) | `encrypt(
      data: createCrypto.ECDSAData,
      option: Options,
    ): ECDSACipherResult | undefined` |
| [`decrypt`](#zoscryptoecdsacryptodecrypt) | `decrypt(
      data: createCrypto.ECDSAData,
      option: Options,
    ): ECDSACipherResult | undefined` |

#### `@zos/crypto.ECDSACrypto.createChiper`

Create an ECDSA public/private key pair; returns `undefined` on failure

```ts
createChiper(): ECDSAKeyResult | undefined
```

**ECDSAKeyResult**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `private_key_length` | `number` | not stated | — | Private key length |
| `private_key` | `ArrayBuffer` | not stated | — | Private key data |
| `pub_key_length` | `number` | not stated | — | Public key length |
| `pub_key` | `ArrayBuffer` | not stated | — | Public key data |

#### `@zos/crypto.ECDSACrypto.encrypt`

Generate a digital signature for data

```ts
encrypt(
      data: createCrypto.ECDSAData,
      option: Options,
    ): ECDSACipherResult | undefined
```

**Options**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `digest_type` | `typeof alg.MD5&#124;typeof alg.HMACMD5` | not stated | — | Digest algorithm; supports alg.MD5 and alg.HMACMD5 |

**ECDSACipherResult**

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `data` | `ArrayBuffer` | not stated | — | Digital signature data |
| `length` | `number` | not stated | — | Data length |

#### `@zos/crypto.ECDSACrypto.decrypt`

Verify source data with signature data

```ts
decrypt(
      data: createCrypto.ECDSAData,
      option: Options,
    ): ECDSACipherResult | undefined
```

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
