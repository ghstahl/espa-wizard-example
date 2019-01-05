if (process.argv.length < 2) {
    console.error('ERROR - missing arguments...');
    console.log('INFO - please use the command as: npm run test-plugin <plugin>, ie: npm run test-plugin forest');
    process.exit(1);
}

const plugin = process.argv[2];
const cwd = process.cwd();

const cmd = require('node-cmd');
const scriptPath = `karma start src/test/plugins/${plugin}/karma.conf.js --cwd=${cwd}`;

cmd.get( scriptPath, function(err, data, stderr){
        console.log('RESULT: ', data)
    }
);