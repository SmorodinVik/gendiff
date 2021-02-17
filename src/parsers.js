import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const mapping = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.yaml': yaml.load,
};

export default (pathToFile) => {
  const extension = path.extname(pathToFile);
  const parser = mapping[extension];
  const absolutePath = path.resolve(pathToFile);
  const fileData = fs.readFileSync(absolutePath, 'utf-8');
  const parsedData = parser(fileData);
  return parsedData;
};
