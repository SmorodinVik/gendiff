import stylish from './stylish.js';
import plain from './plain.js';

const mapping = {
  stylish,
  plain,
  json: JSON.stringify,
};

export default (data, format) => {
  const formatter = mapping[format];
  return formatter(data);
};
