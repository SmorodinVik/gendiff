import _ from 'lodash';

const formatValue = (val) => {
  if (_.isArray(val)) {
    return '[complex value]';
  }
  return _.isString(val) ? `'${val}'` : val;
};

const fn = (data, parents = '') => {
  const result = data.reduce((acc, current, i) => {
    const { key, value, status } = current;
    const keyWithParents = `${parents}${key}`;

    if (status === '-') {
      if (data[i + 1] && data[i + 1].key === key) {
        const oldValue = formatValue(value);
        const newValue = formatValue(data[i + 1].value);
        acc.push(`Property '${keyWithParents}' was updated. From ${oldValue} to ${newValue}`);
      } else {
        acc.push(`Property '${keyWithParents}' was removed`);
      }
    } else if (status === '+') {
      if (data[i - 1] && data[i - 1].key === key) {
        return acc;
      }
      acc.push(`Property '${keyWithParents}' was added with value: ${formatValue(value)}`);
    } else if (_.isArray(value)) {
      acc.push(fn(value, `${keyWithParents}.`));
    }
    return acc;
  }, []).flat();
  return result.join('\n');
};

export default (dataTree) => fn(dataTree);
