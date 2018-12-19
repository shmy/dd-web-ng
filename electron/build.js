const builder = require('electron-builder');
const path = require('path');
const shelljs = require('shelljs');
const Platform = builder.Platform;

shelljs.cp('-R', path.join(__dirname, '../dist/dd-web'), path.join(__dirname, '/src'));
// Promise is returned
builder.build({
  targets: Platform.MAC.createTarget(),
  config: {
    appId: 'tech.shmy.dd_desktop',
    asar: false,
    directories: {
      app: path.join(__dirname, '/src'),
      output: path.join(__dirname, '/dist'),
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
