import stylish from './stylish.js';
import plain from './plain.js';

const mapping = {
  stylish,
  plain,
};

export default (data, format) => {
  const formatter = mapping[format];
  return formatter(data);
};
