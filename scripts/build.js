if (process.argv.length < 4) {
    console.error('ERROR - missing arguments...');
    console.log('INFO - please use the command as: npm run build <product> <release_ver>, ie: npm run build myapp 1.0.0');
    process.exit(1);
}

let releaseJson = {
    "version":"",
    "timestamp":""
};

let product = process.argv[2];
releaseJson.version = process.argv[3];
releaseJson.timestamp = new Date().getTime();

let fs = require('fs-extra');
let cmd = require('node-cmd');

function build() {
    cmd.get(
        `jspm build src/build/${product}/main.js dist/espa/${product}/${releaseJson.version}/main.js && jspm build src/build/${product}/main.js dist/espa/${product}/${releaseJson.version}/main.min.js --minify`,
        //`jspm build src/build/${product}/main.js --production dist/espa/${product}/${releaseJson.version}/main.js`,
        function(err, data, stderr) {
            if (err) {
                console.error('ERROR: ', err);
            } else {
                fs.writeFileSync(`dist/espa/${product}/release.json`, JSON.stringify(releaseJson, null, 4) , 'utf-8');
            }
            console.log('RESULT: ', data);
            copyExtraResources();
        }
    );
}

function copyExtraResources() {
    try {
        fs.copySync(`src`, `dist/espa/${product}/${releaseJson.version}/src`);                
        console.log('INFO: copyExtraResources success');
      } catch (err) {
        console.error('ERROR: ', err);
      }
}

build();