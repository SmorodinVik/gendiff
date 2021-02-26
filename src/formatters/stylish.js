import _ from 'lodash';

const stringify = (value, spacesNumber) => {
  if (!_.isPlainObject(value)) {
    return value;
  }
  const stringified = Object.keys(value)
    .map((key) => `${' '.repeat(spacesNumber + 6)}${key}: ${stringify(value[key], spacesNumber + 4)}`);
  return `{\n${stringified.join('\n')}\n${' '.repeat(spacesNumber + 2)}}`;
};

const formatToStylish = (array, spacesCount) => {
  const result = array.map(({
    type, key, oldValue, newValue, children,
  }) => {
    const oldValueStringified = stringify(oldValue, spacesCount);
    const newValueStringified = stringify(newValue, spacesCount);
    switch (type) {
      case 'added':
        return `${' '.repeat(spacesCount)}${'+'} ${key}: ${newValueStringified}`;
      case 'removed':
        return `${' '.repeat(spacesCount)}${'-'} ${key}: ${oldValueStringified}`;
      case 'no_changes':
        return `${' '.repeat(spacesCount)}${' '} ${key}: ${newValueStringified}`;
      case 'updated':
        return `${' '.repeat(spacesCount)}${'-'} ${key}: ${oldValueStringified}\n${' '.repeat(spacesCount)}${'+'} ${key}: ${newValueStringified}`;
      case 'changed':
        return `${' '.repeat(spacesCount)}${' '} ${key}: ${formatToStylish(children, spacesCount + 4)}`;
      default:
        throw new Error(`Unknown type: '${type}'!`);
    }
  });
  return `{\n${result.join('\n')}\n${' '.repeat(spacesCount - 2)}}`;
};

export default (data) => formatToStylish(data, 2);
