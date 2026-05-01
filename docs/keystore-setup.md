# Keystore setup

## Files

- `eoic-release.jks` — RSA-2048 PKCS12 keystore. Validity ~27 years from 2026-05-01.
  - **Local copy:** `eoic-release.jks` in this repo's working tree (gitignored, NOT committed).
  - **Backup locations:** _add yours here once you have them_ (recommended: 1Password attachment, eTechGroup IT secure store, encrypted USB).

- `~/eoic-android-keystore-creds.txt` — generated keystore + alias passwords (chmod 600).
  - This file is the only plaintext copy of the password. **Save the contents to a password manager and delete the file** once you've stored it elsewhere.

## GitHub Actions secrets

The release workflow reads these from repo secrets at https://github.com/NickCason/e-OIC-android-wrapper/settings/secrets/actions:

- `KEYSTORE_BASE64` — base64 of `eoic-release.jks`
- `KEYSTORE_PASSWORD`
- `KEY_ALIAS` — `eoic`
- `KEY_PASSWORD` — same as `KEYSTORE_PASSWORD` (PKCS12 forces a single password for store + key)

## Rotation

The same keystore must be used for every release. Losing it means installed APKs cannot be upgraded — users would have to uninstall first, losing local data. If rotation becomes necessary, plan for a coordinated reinstall across all field engineers.

## Local release builds

Set the same env vars and pass the keystore path to Gradle:

```bash
export KEYSTORE_PATH=/path/to/eoic-release.jks
export KEYSTORE_PASSWORD='...'
export KEY_ALIAS=eoic
export KEY_PASSWORD='...'   # same as KEYSTORE_PASSWORD
cd android && ./gradlew assembleRelease -PwrapperVersion=v1
```

Most release builds happen in CI. Local builds are for emergencies only.
