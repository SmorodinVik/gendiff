import _ from 'lodash';

const formatToStylish = (obj, timesToRepeat) => {
  const result = obj.map(({ key, value, status }) => {
    const mapping = {
      added: '+',
      removed: '-',
      no_changes: ' ',
    };
    const statusValue = mapping[status];
    const newValue = _.isArray(value) ? formatToStylish(value, timesToRepeat + 4) : value;
    return `${' '.repeat(timesToRepeat)}${statusValue} ${key}: ${newValue}`;
  });
  return `{\n${result.join('\n')}\n${' '.repeat(timesToRepeat - 2)}}`;
};

export default (data) => formatToStylish(data, 2);
