// import * as _ from 'lodash';
import fs from 'fs';
import path from 'path';
import readAndParse from './parsers.js';

export default (path1, path2) => {
  const data1 = readAndParse(path1);
  const data2 = readAndParse(path2);
  const keys = Object.keys({ ...data1, ...data2 }).sort();
  const resultArray = keys.reduce((acc, key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (value1 === undefined) {
      acc.push(`  + ${key}: ${value2}`);
    } else if (value2 === undefined) {
      acc.push(`  - ${key}: ${value1}`);
    } else if (value1 === value2) {
      acc.push(`    ${key}: ${value1}`);
    } else {
      acc.push(`  - ${key}: ${value1}`);
      acc.push(`  + ${key}: ${value2}`);
    }
    return acc;
  }, []);
  const resultToString = `{\n${resultArray.join('\n')}\n}`;
  return resultToString;
};
