import _ from 'lodash';

const stylish = (data) => {
  const fn = (obj, timesToRepeat) => {
    const result = obj.map(({ key, value, status }) => {
      const newValue = _.isArray(value) ? fn(value, timesToRepeat + 4) : value;
      return `${' '.repeat(timesToRepeat)}${status} ${key}: ${newValue}`;
    });
    return `{\n${result.join('\n')}\n${' '.repeat(timesToRepeat - 2)}}`;
  };

  return fn(data, 2);
};

export default stylish;
