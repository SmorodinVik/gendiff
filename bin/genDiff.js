#!/usr/bin/env node
import commander from 'commander';
import findDiff from '../src/findDiff.js';
import readAndParse from '../src/parsers.js';
import stylish from '../src/stylish.js';

commander
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const mapping = {
      stylish,
    };
    const formatter = mapping[commander.opts().format];
    const data1 = readAndParse(filepath1);
    const data2 = readAndParse(filepath2);
    const diffs = findDiff(data1, data2);
    // console.log(JSON.stringify(diffs, null, 4));
    console.log(formatter(diffs));
  })
  .parse(process.argv);
