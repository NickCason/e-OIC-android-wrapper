import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.etechgroup.eoic',
  appName: 'e-OIC',
  webDir: 'src',
  server: {
    url: 'https://nickcason.github.io/e-OIC/',
    cleartext: false,
    androidScheme: 'https',
  },
};

export default config;
