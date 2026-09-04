# @zos/crypto

**5 symbols**

| Symbol | Type | Min API_LEVEL | Confidence |
| --- | --- | --- | --- |
| `AESCrypto` | value | not stated | OFFICIAL |
| `CRCCrypto` | value | not stated | OFFICIAL |
| `DigestCrypto` | value | not stated | OFFICIAL |
| `ECDSACrypto` | value | not stated | OFFICIAL |
| `encryptKey` | function | >= 3 | OFFICIAL |

`not stated` means no source documents a minimum for that symbol — not that it works on any level.

## Descriptions

### `@zos/crypto.encryptKey`

Encrypt data with the firmware PUF hardware module using AES. Input length must be a multiple of 16 bytes; returns `undefined` on failure.
