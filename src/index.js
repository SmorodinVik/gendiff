import fs from 'fs';
import path from 'path';
import formatter from './formatters/index.js';
import parser from './parsers.js';
import buildDiffTree from './buildDiffTree.js';

export default (path1, path2, format) => {
  const extension1 = path.extname(path1);
  const absolutePath1 = path.resolve(path1);
  const fileData1 = fs.readFileSync(absolutePath1, 'utf-8');
  const parsedData1 = parser(fileData1, extension1);

  const extension2 = path.extname(path2);
  const absolutePath2 = path.resolve(path2);
  const fileData2 = fs.readFileSync(absolutePath2, 'utf-8');
  const parsedData2 = parser(fileData2, extension2);

  const diffTree = buildDiffTree(parsedData1, parsedData2);

  const formattedResult = formatter(diffTree, format);
  return formattedResult;
};
