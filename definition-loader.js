"use strict";
const { execSync } = require("child_process");
const { dirname, join } = require("path");

/**
 * Creates a *.css.d.ts when saving CSS
 */
module.exports = function definitionLoader(content) {
  try {
    const contentDir = dirname(this.resourcePath);
    execSync(`npx tcm ${contentDir}`, {
      stdio: "inherit"
    });
  } catch (err) {
    console.error(err.message);
  }

  return content;
};

module.exports.raw = true;
