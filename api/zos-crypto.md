# @zos/crypto

**5 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `AESCrypto` | value | any | OFFICIAL |
| `CRCCrypto` | value | any | OFFICIAL |
| `DigestCrypto` | value | any | OFFICIAL |
| `ECDSACrypto` | value | any | OFFICIAL |
| `encryptKey` | function | >= 3 | OFFICIAL |

## Descriptions

### `@zos/crypto.encryptKey`

Encrypt data with the firmware PUF hardware module using AES. Input length must be a multiple of 16 bytes; returns `undefined` on failure.
