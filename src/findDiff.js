import _ from 'lodash';

const findDiff = (obj1, obj2 = obj1) => {
  const keys = Object.keys({ ...obj1, ...obj2 }).sort();
  const result = keys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (value1 === undefined) {
      const parsedValue2 = _.isObject(value2) && !_.isArray(value2) ? findDiff(value2) : value2;
      acc.push({ key, value: parsedValue2, status: '+' });
    } else if (value2 === undefined) {
      const parsedValue1 = _.isObject(value1) && !_.isArray(value1) ? findDiff(value1) : value1;
      acc.push({ key, value: parsedValue1, status: '-' });
    } else if (value1 === value2 && !_.isObject(value1)) {
      acc.push({ key, value: value1, status: ' ' });
    } else if (_.isObject(value1)
        && !_.isArray(value1)
        && _.isObject(value2)
        && !_.isArray(value2)) {
      acc.push({ key, value: findDiff(value1, value2), status: ' ' });
    } else {
      const parsedValue1 = _.isObject(value1) && !_.isArray(value1) ? findDiff(value1) : value1;
      const parsedValue2 = _.isObject(value2) && !_.isArray(value2) ? findDiff(value2) : value2;
      acc.push({ key, value: parsedValue1, status: '-' });
      acc.push({ key, value: parsedValue2, status: '+' });
    }
    return acc;
  }, []);
  return result;
};

export default findDiff;
