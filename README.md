# e-OIC Android wrapper

A thin Capacitor Android shell for the e-OIC PWA at https://nickcason.github.io/e-OIC/.

## Why

Chrome Android refuses to share `.zip` and `.xlsx` files via `navigator.share`
due to a hardcoded MIME/extension allowlist in `share_service_impl.cc`. The
wrapper bypasses this by using Android's `Intent.ACTION_SEND` directly via
the `@capacitor/share` plugin.

## What's in here

The WebView points at the live PWA URL; content updates instantly with
each PWA deploy. The APK only needs rebuilding when this wrapper's
native shell changes (Capacitor upgrade, share-bridge bugfix, etc.).

## Build

Local debug build (requires Android SDK + JDK 17):

```bash
npm ci
npx cap sync android
cd android && ./gradlew assembleDebug -PwrapperVersion=v0-dev
```

Output: `android/app/build/outputs/apk/debug/app-debug.apk`

## Release

Tag a version and push:

```bash
git tag v2 && git push --tags
```

GitHub Actions builds and uploads the signed APK to Releases. The
e-OIC web app fetches `wrapper-version.json` and prompts users to
update when a newer version exists. See `docs/keystore-setup.md` for
secret management.

## Pre-release smoke checklist

1. Sideload the APK to the test emulator (`adb install -r e-OIC.apk`).
2. Launch app — WebView loads live e-OIC.
3. Verify `window.Capacitor.isNativePlatform()` returns `true` (DevTools → console).
4. Export a job → Share → verify Android share sheet appears with `.zip`.
5. Send to Drive (pre-installed); confirm file arrives intact.
6. Manually edit `BuildConfig.WRAPPER_VERSION` to a value behind
   `wrapper-version.json`'s remote version, rebuild, install. Confirm
   the update banner appears in e-OIC.
7. Tap Update → confirm system installer launches → install completes
   without uninstall (same keystore signature).
