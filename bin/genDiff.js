#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../src/index.js';

commander
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const { format } = commander.opts();
    const diff = genDiff(filepath1, filepath2, format);
    console.log(diff);
  })
  .parse(process.argv);
