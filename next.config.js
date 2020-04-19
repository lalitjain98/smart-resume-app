const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withBabelMinify = require('next-babel-minify')({
  removeConsole: false,
});

require('dotenv').config();

const envObj = {
  PORT: process.env.PORT,
};

module.exports = withCSS(
  withBabelMinify(
    withSass({
      env: envObj,
      publicRuntimeConfig: envObj,
    }),
  ),
);
