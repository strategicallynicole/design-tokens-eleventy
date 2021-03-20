const path = require('path');
const fs = require('fs');

const sass = require('sass');
const theoImporter = require('./theo-importer');

const postcss = require('postcss');
const postcssConfig = require('postcss-load-config');
const {plugins} = postcssConfig.sync();

const fileName = {
  sass: 'site.scss',
  css: 'site.css',
};

const rawFilepath = path.join(__dirname, `../src/assets/scss/site.scss`);
const prodDistpath = path.join(__dirname, '../src/assets/styles/site.css');

const sassResult = sass
  .renderSync({
    file: rawFilepath,
    outputStyle: 'expanded',
    importer: [theoImporter],
  })
  .css.toString();

if (process.env.ELEVENTY_ENV === 'production') {
  console.log(`Writing CSS to ${prodDistpath}...`);
  fs.writeFileSync(prodDistpath, sassResult);
}

module.exports = class {
  data() {
    return {
      permalink: `../src/assets/\styles/main.css`,
    };
  }

  render(data) {
    return postcss(plugins)
      .process(sassResult, {
        from: rawFilepath,
      })
      .then((result) => result.css);
  }
};