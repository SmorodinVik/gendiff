import _ from 'lodash';

const findDiff = (obj1, obj2) => {
  const keys = Object.keys({ ...obj1, ...obj2 }).sort();
  const result = keys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (value1 === undefined) {
      acc.push({ key, value: value2, status: '+' });
    } else if (value2 === undefined) {
      acc.push({ key, value: value1, status: '-' });
    } else if (value1 === value2) {
      acc.push({ key, value: value1, status: ' ' });
    } else if (_.isObject(value1) && !_.isArray(value1) && _.isObject(value2) && !_.isArray(value2)) {
      acc.push({ key, value: findDiff(value1, value2), status: ' ' });
    } else {
      acc.push({ key, value: value1, status: '-' });
      acc.push({ key, value: value2, status: '+' });
    }
    return acc;
  }, []);
  return result;
};

export default findDiff;
