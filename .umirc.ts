import { defineConfig } from 'dumi';
const { name: project } = require('./package.json');

export default defineConfig({
  // more config: https://d.umijs.org/config
  lessLoader: {
    modifyVars: {
      'primary-color': '#ee4d2d',
    },
    javascriptEnabled: true,
  },
});
