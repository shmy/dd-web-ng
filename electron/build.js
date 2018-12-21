const builder = require('electron-builder');
const path = require('path');
const shelljs = require('shelljs');
const Platform = builder.Platform;

shelljs.cp('-R', path.join(__dirname, '../dist/dd-web'), path.join(__dirname, '/src'));
// Promise is returned
builder.build({
  targets: Platform.MAC.createTarget(),
  config: {
    electronVersion: '3.0.9',
    electronDownload: {
      mirror: 'http://npm.taobao.org/mirrors/electron/',
    },
    appId: 'tech.shmy.dd_desktop',
    productName: '黑人视频',
    asar: true,
    extraResources: [
      {
        "from": "build/ffmpeg-macos64-shared",
        "to": "ffmpeg",
      }
    ],
    directories: {
      app: path.join(__dirname, '/src'),
      output: path.join(__dirname, '/dist'),
    },
    mac: {
      target: [
        { target: 'dmg', arch: 'x64' },
      ]
    },
  }
})
  .then((result) => {
    console.log(result);
    // handle result
  })
  .catch((error) => {
    // handle error
  })
