if (process.argv.length < 2) {
    console.error('ERROR - missing arguments...');
    console.log('INFO - please use the command as: npm run test <product>, ie: npm run test myapp');
    process.exit(1);
}

const product = process.argv[2];
const cwd = process.cwd();

const cmd = require('node-cmd');
const scriptPath = `karma start src/test/${product}/karma.conf.js --cwd=${cwd}`;

cmd.get( scriptPath, function(err, data, stderr){
        console.log('RESULT: ', data)
    }
);