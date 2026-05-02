import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.etechgroup.eoic',
  appName: 'e-OIC',
  webDir: 'src',
  // WebView background fills the brief gap between splash dismissal and the
  // PWA's first paint with the same energy-orange used for the splash, so
  // launch reads as one continuous brand moment instead of an orange flash
  // followed by a white flash.
  android: {
    backgroundColor: '#BE4829',
  },
  server: {
    url: 'https://nickcason.github.io/e-OIC/',
    cleartext: false,
    androidScheme: 'https',
  },
};

export default config;
