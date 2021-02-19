import stylish from './stylish.js';

const mapping = {
  stylish,
};

export default (data, format) => {
  const formatter = mapping[format];
  return formatter(data);
};
