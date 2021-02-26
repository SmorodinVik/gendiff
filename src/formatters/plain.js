import _ from 'lodash';

const formatValue = (val) => {
  if (_.isArray(val) || _.isObject(val)) {
    return '[complex value]';
  }
  return _.isString(val) ? `'${val}'` : val;
};

const formatToPlain = (data, parents = '') => {
  const result = data
    .filter(({ type }) => type !== 'no_changes')
    .flatMap(({
      type, key, oldValue, newValue, children,
    }) => {
      const keyWithParents = `${parents}${key}`;
      const formattedOldValue = formatValue(oldValue);
      const formattedNewValue = formatValue(newValue);
      switch (type) {
        case 'removed':
          return `Property '${keyWithParents}' was removed`;
        case 'added':
          return `Property '${keyWithParents}' was added with value: ${formattedNewValue}`;
        case 'updated':
          return `Property '${keyWithParents}' was updated. From ${formattedOldValue} to ${formattedNewValue}`;
        case 'changed':
          return formatToPlain(children, `${keyWithParents}.`);
        default:
          throw new Error(`Unknown type: '${type}'!`);
      }
    });
  return result.join('\n');
};

export default (dataTree) => formatToPlain(dataTree);
