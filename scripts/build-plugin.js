if (process.argv.length < 4) {
    console.error('ERROR - missing arguments...');
    console.log('INFO - please use the command as: npm run build-plugin <plugin> <release_ver>, ie: npm run build-plugin myplugin 1.0.0');
    process.exit(1);
}

let releaseJson = {
    "version":"",
    "timestamp":""
};

let plugin = process.argv[2];
releaseJson.version = process.argv[3];
releaseJson.timestamp = new Date().getTime();

let fs = require('fs-extra');
let cmd = require('node-cmd');

function build() {
    cmd.get(
        `jspm build src/build/plugins/${plugin}/main.js --dev dist/espa/plugins/${plugin}/${releaseJson.version}/main.js && jspm build src/build/plugins/${plugin}/main.js dist/espa/plugins/${plugin}/${releaseJson.version}/main.min.js --dev --minify`,
        function(err, data, stderr) {
            if (err) {
                console.error('ERROR: ', err);
            } else {
                fs.writeFileSync(`dist/espa/plugins/${plugin}/release.json`, JSON.stringify(releaseJson, null, 4) , 'utf-8');
            }
            console.log('RESULT: ', data);
            copyExtraResources();
        }
    );
}

function copyExtraResources() {
    try {        
        fs.copySync(`src/build/plugins/${plugin}/styles`, `dist/espa/plugins/${plugin}/${releaseJson.version}/styles`);                
        console.log('INFO: copyExtraResources success');
      } catch (err) {
        console.error('ERROR: ', err);
      }
}

build();