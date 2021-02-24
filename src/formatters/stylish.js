import _ from 'lodash';

const checkAndStringify = (value, spacesNumber) => {
  if (!_.isObject(value) || _.isArray(value)) {
    return value;
  }
  const converted = Object.keys(value)
    .map((key) => `${' '.repeat(spacesNumber + 6)}${key}: ${checkAndStringify(value[key], spacesNumber + 4)}`);
  return `{\n${converted.join('\n')}\n${' '.repeat(spacesNumber + 2)}}`;
};

const formatToStylish = (array, spacesCount) => {
  const result = array.map(({
    type, key, oldValue, newValue, children,
  }) => {
    const oldValueStringified = checkAndStringify(oldValue, spacesCount);
    const newValueStringified = checkAndStringify(newValue, spacesCount);

    if (type === 'added') {
      return `${' '.repeat(spacesCount)}${'+'} ${key}: ${newValueStringified}`;
    }
    if (type === 'removed') {
      return `${' '.repeat(spacesCount)}${'-'} ${key}: ${oldValueStringified}`;
    }
    if (type === 'no_changes') {
      return `${' '.repeat(spacesCount)}${' '} ${key}: ${newValueStringified}`;
    }
    if (type === 'updated') {
      return `${' '.repeat(spacesCount)}${'-'} ${key}: ${oldValueStringified}\n${' '.repeat(spacesCount)}${'+'} ${key}: ${newValueStringified}`;
    }
    return `${' '.repeat(spacesCount)}${' '} ${key}: ${formatToStylish(children, spacesCount + 4)}`;
  });
  return `{\n${result.join('\n')}\n${' '.repeat(spacesCount - 2)}}`;
};

export default (data) => formatToStylish(data, 2);
