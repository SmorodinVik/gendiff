#!/usr/bin/env node
import commander from 'commander';
import findDiff from '../src/findDiff.js';

commander
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const data = findDiff(filepath1, filepath2);
    console.log(data);
  })
  .parse(process.argv);
