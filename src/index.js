import fs from 'fs';
import path from 'path';
import getFormatter from './formatters/index.js';
import parse from './parsers.js';
import buildDiffTree from './buildDiffTree.js';

export default (path1, path2, format = 'stylish') => {
  const extension1 = path.extname(path1);
  const fullPath1 = path.resolve(path1);
  const fileData1 = fs.readFileSync(fullPath1, 'utf-8');
  const parsedData1 = parse(fileData1, extension1);

  const extension2 = path.extname(path2);
  const fullPath2 = path.resolve(path2);
  const fileData2 = fs.readFileSync(fullPath2, 'utf-8');
  const parsedData2 = parse(fileData2, extension2);

  const diffTree = buildDiffTree(parsedData1, parsedData2);

  return getFormatter(diffTree, format);
};
