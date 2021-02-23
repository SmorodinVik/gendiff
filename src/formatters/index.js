import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';

const formatter = {
  stylish,
  plain,
  json: JSON.stringify,
};

export default (data, format) => {
  if (!_.has(formatter, format)) {
    throw new Error(`Unknown format '${format}'.`);
  }
  return formatter[format](data);
};
