#!/usr/bin/env node

import fs from 'node:fs'
import shelljs from 'shelljs';
import { input } from '@inquirer/prompts';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';




let folderName = await input({ message: "What The Project Name:", default: "test" });
let starterCode = `
const express = require('express')
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log("Example app listening on localhost:"+PORT)
})
`

fs.mkdirSync(`./${folderName}`);

shelljs.cd(folderName);

shelljs.exec('npm -y init');
shelljs.exec('npm i express');
shelljs.exec('npm i nodemon');
fs.writeFileSync("index.js", starterCode);
let nodemonStart = '    "start": "nodemon .",';


fs.readFile("package.json", 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  
    const lines = data.split('\n');
    lines.splice(6, 0, nodemonStart);
    const updatedText = lines.join('\n');
    fs.writeFile("package.json", updatedText, 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
});

figlet(`!  ${folderName}   is   Ready  !`, async (err, data) => {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  });

await console.log(chalk.green(`\n\nTo Start Write\n$ cd ${folderName}\n$ npm run start`));
