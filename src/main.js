import plugin from '../plugin.json';
import style from "./style.scss";
const settings = acode.require('settings');
const { editor } = editorManager
/**
 * theme name Must not contain space and must be separated by (-)
 * e.g. vscode-dark
 * one-dark
 * monokai
 */
// only modify this name and nothing else 
const themeName = "vscode-dark"
// go to style.scss and change colors there

ace.define(`ace/theme/${themeName}.css`, ["require", "exports", "module"], function (require, exports, module) { module.exports = style }),
ace.define(`ace/theme/${themeName}`, ["require", "exports", "module", `ace/theme/${themeName}.css`, "ace/lib/dom"], function (require, exports, module) {
  exports.isDark = !0,
  exports.cssClass = `ace-${themeName}`,
  exports.cssText = require(`./${themeName}.css`);
  const dom = require("../lib/dom");
  dom.importCssString(exports.cssText, exports.cssClass, !1)
});
(function () {
  window.require(["ace/theme/" + themeName], function (m) {
    if (typeof module == "object" && typeof exports == "object" && module) {
      module.exports = m;
    }
  });
})();

class AcodePlugin {
  async init() {
    ace.require("ace/ext/themelist").themes.push({
      caption: themeName.split("-").map(name => name[0].toUpperCase() + name.slice(1)).join(" "),
      theme: "ace/theme/" + themeName,
      isDark: true
    });
    
    const currentTheme = settings.get("editorTheme")
    if (currentTheme === themeName) editor.setTheme("ace/theme/" + themeName);
    settings.on("update", this.onThemeChange)
  }
  
  async destroy() { settings.off("update", this.onThemeChange) }
  
  onThemeChange(value) {
    if (value === ("ace/theme/" + themeName)) {
      editor.setTheme("ace/theme/" + themeName)
      settings.update({ editorTheme: themeName })
    }
  }
}

if (window.acode) {
  const acodePlugin = new AcodePlugin();
  acode.setPluginInit(plugin.id, (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
    if (!baseUrl.endsWith('/')) {
      baseUrl += '/';
    }
    acodePlugin.baseUrl = baseUrl;
    acodePlugin.init($page, cacheFile, cacheFileUrl);
  });
  acode.setPluginUnmount(plugin.id, () => {
    acodePlugin.destroy();
  });
}