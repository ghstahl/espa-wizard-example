//PLUGIN AUTHOR: Add your plugin folder here so that build script can pick it up
var plugins = [
  'myplugin',
  'forest',
  'harvester',
  'fileLoader'
];

SystemJS.config({
  paths: {
    "github:": "jspm_packages/github/",
    "npm:": "jspm_packages/npm/"
  },
  browserConfig: {
    "baseURL": "http://localhost:8888"
  },
  devConfig: {
    "map": {
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "core-js": "npm:core-js@1.2.7",
      "fs": "npm:jspm-nodelibs-fs@0.2.1",
      "path": "npm:jspm-nodelibs-path@0.2.3",
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.25",
      "systemjs/plugin-text": "github:systemjs/plugin-text@0.0.11",
      "systemjs/plugin-json": "github:systemjs/plugin-json@0.3.0"
    },
    "packages": {
      "npm:babel-runtime@5.8.38": {
        "map": {}
      },
      "npm:core-js@1.2.7": {
        "map": {
          "systemjs-json": "github:systemjs/plugin-json@0.1.2"
        }
      }
    }
  },
  transpiler: "plugin-babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  map: {
    "babel": "npm:babel-core@5.8.38",
    "text": "github:systemjs/plugin-text@0.0.11",
    "json": "node_modules/systemjs-plugin-json/json.js"
  },
  meta: {
    "*.html": {
      "loader": "text"
    },
    "*.json": {
      "loader": "json"
    }
  }
});

var pluginPackages = {};
plugins.forEach(function (plugin) {
  pluginPackages[`src/build/plugins/${plugin}`] = {
    "map": {
      "./main.js": {
        "production": "plugin.build.bypass.config.js"
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "assert": "npm:jspm-nodelibs-assert@0.2.1",
    "process": "npm:jspm-nodelibs-process@0.2.1"
  },
  packages: pluginPackages
});