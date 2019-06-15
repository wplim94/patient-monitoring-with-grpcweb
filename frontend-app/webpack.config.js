const path = require('path');
module.exports = {
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  node: {
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    fs: 'empty',
    child_process : 'empty',
    net : 'empty',
    tls: 'empty',
  }
};