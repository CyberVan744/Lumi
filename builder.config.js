module.exports = {
  appId: 'education.lumi.lumi',
  productName: 'Lumi',
  // Lumi has no native addons that need rebuilding against Electron's ABI. The
  // only "native" module is bunyan's optional dtrace-provider (a no-op on
  // Windows), whose node-gyp rebuild fails on newer CI runners whose Visual
  // Studio the bundled node-gyp cannot detect. Skip the rebuild entirely.
  npmRebuild: false,
  asar: true,
  // The H5P HTML/SCORM exporter reads the core, editor and library assets from
  // the real filesystem while bundling. Keep all of assets/h5p unpacked from the
  // asar archive so those reads work in packaged builds (previously only
  // libraries were unpacked, which could break the export).
  asarUnpack: ['assets/h5p/**'],
  icon: 'assets/lumi.icns',
  files: [
    'build/**/*',
    'client/**/*',
    'node_modules/**/*',
    'assets/**/*',
    'package.json'
  ],
  mac: {
    category: 'education.lumi.lumi',
    gatekeeperAssess: false,
    entitlements: 'assets/mac/entitlements.mac.plist',
    entitlementsInherit: 'assets/mac/entitlements.mac.plist',
    fileAssociations: {
      ext: 'h5p',
      name: 'H5P'
    },
    target: [
      {
        target: 'dmg',
        arch: ['arm64', 'x64']
      },
      {
        target: 'zip',
        arch: ['arm64', 'x64']
      }
    ],
    hardenedRuntime: true,
    extraResources: [
      {
        from: 'node_modules/electron/dist/Electron.app/Contents/Frameworks/Electron Framework.framework',
        to: 'Frameworks/Electron Framework.framework'
      }
    ]
  },
  win: {
    icon: 'assets/lumi.png',
    fileAssociations: {
      ext: 'h5p',
      name: 'H5P'
    }
  },
  appx: {
    identityName: process.env.APPX_IDENTITY_NAME,
    applicationId: process.env.APPX_APPLICATION_ID,
    publisher: process.env.APPX_PUBLISHER,
    displayName: process.env.APPX_DISPLAY_NAME,
    publisherDisplayName: process.env.APPX_PUBLISHER_DISPLAY_NAME
  },
  nsis: {
    deleteAppDataOnUninstall: true
  },
  linux: {
    category: 'Utility'
  },
  dmg: {
    sign: false
  },
  publish: {
    provider: 'github',
    releaseType: 'release'
  }
};
