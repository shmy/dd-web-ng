const builder = require('electron-builder');
const path = require('path');
const shelljs = require('shelljs');
const Platform = builder.Platform;

shelljs.cp('-R', path.join(__dirname, '../dist/dd-web'), path.join(__dirname, '/src'));
// Promise is returned
builder.build({
  targets: Platform.WINDOWS.createTarget(),
  config: {
    electronVersion: '3.0.9',
    electronDownload: {
      mirror: 'http://npm.taobao.org/mirrors/electron/',
    },
    appId: 'tech.shmy.dd_desktop',
    productName: '黑人视频',
    asar: true,
    directories: {
      app: path.join(__dirname, '/src'),
      output: path.join(__dirname, '/dist'),
    },
    win: {
      target: [
        { target: 'nsis', arch: 'ia32' },
      ]
    },
    nsis: {
      oneClick: false,
      perMachine: true,
      allowToChangeInstallationDirectory: true,
      uninstallDisplayName: '卸载黑人视频',
    }
  }
})
  .then((result) => {
    console.log(result);
    // handle result
  })
  .catch((error) => {
    // handle error
  })
