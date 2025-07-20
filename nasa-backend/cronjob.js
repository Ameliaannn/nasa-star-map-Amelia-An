const cron = require('node-cron');
const { exec } = require('child_process');

cron.schedule('0 6 * * *', () => {
    console.log('Running Neodata fetch script at 6:00 AM');
    exec('node Neodata.js', (err, stdout, stderr) => {
        if (err) {
            console.error('Execution error:', err);
            return;
        }
        console.log('Output:', stdout);
        console.error('Error output:', stderr);
    });
});