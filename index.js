const { takeUserInput } = require('./functions');


const fs = require('fs');
const { exit } = require('process');

fs.readFile('./input.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    exit();
  }
  
  takeUserInput(data);
  exit();
})

