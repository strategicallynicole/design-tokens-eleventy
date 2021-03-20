const { DateTime } = require('luxon');
/*const pluginSass = require("eleventy-plugin-sass");
const sassPluginOptions = require("./_config/sassPluginOptions.json");
/*const sass = require("./_tasks/sass-process.js");
sass("./src/assets/scss/site.scss", "../styles");*/
module.exports = function(eleventyConfig) {

	eleventyConfig.addFilter("readable_date", function(date) {
		return DateTime.fromJSDate(date).toFormat('dd LLL yyyy')
	});

	eleventyConfig.addFilter("get_suffix", function(page) {
		const path = page.inputPath.split('.')
		return path[path.length - 1]
	});

	eleventyConfig.addFilter("get_filename", function(page) {
		const path = page.inputPath.split('/')
		return path[path.length - 1]
	});

	eleventyConfig.addFilter("get_parentdirectory", function(page) {
		const path = page.inputPath.split('/')
		return path[path.length - 2]
	});

	// Layouts
	eleventyConfig.addLayoutAlias('base',			'layouts/base.njk')
	eleventyConfig.addLayoutAlias('home',			'layouts/home.njk')
	eleventyConfig.addLayoutAlias('components',		'layouts/components.njk')
	eleventyConfig.addLayoutAlias('elements',		'layouts/elements.njk')
	eleventyConfig.addLayoutAlias('objects',		'layouts/objects.njk')
	eleventyConfig.addLayoutAlias('utilities',		'layouts/utilities.njk')
  
  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "../_data",
      output: "dist"
    },
    templateFormats: [
      "njk",
      "md",
      "css",
    ],
    htmlTemplateEngine: 'njk',
		markdownTemplateEngine: 'njk',
    passthroughFileCopy: true
  };

};