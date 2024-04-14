const fs = require('fs');

const readStream = fs.createReadStream('./nc1.txt', { highWaterMark: 10 });
const writeStream = fs.createWriteStream('./ncresult.txt', { encoding: 'utf-8' });

let counterWords = 0;
let word = ''; 

readStream.on('data', (chunk) => {
    for (let i = 0; i < chunk.length; i++) {
        const char = chunk.toString('utf-8', i, i + 1);
        if (/\b[\w'-]+\b/.test(char)) { 
            word += char; 
        } else if (word) { 
            writeStream.write(word + '\n'); 
            counterWords++; 
            console.log(counterWords);
            word = ''; 
        }
    }
});

readStream.on('end', () => {
    if (word) { 
        writeStream.write(word + '\n');
        counterWords++;
    }

    console.log(counterWords);
    writeStream.end();
});

readStream.on('error', (err) => {
    console.error('Error occurred while reading the file:', err);
});
