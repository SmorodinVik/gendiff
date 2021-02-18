#!/usr/bin/env node
import commander from 'commander';
import findDiff from '../src/findDiff.js';
import readAndParse from '../src/parsers.js';

commander
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const data1 = readAndParse(filepath1);
    const data2 = readAndParse(filepath2);
    const diffs = findDiff(data1, data2);
    console.log(JSON.stringify(diffs, null, 4));
  })
  .parse(process.argv);
