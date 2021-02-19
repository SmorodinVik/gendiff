import yaml from 'js-yaml';

const mapping = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.yaml': yaml.load,
};

export default (data, extension) => {
  const parser = mapping[extension];
  const parsedData = parser(data);
  return parsedData;
};
