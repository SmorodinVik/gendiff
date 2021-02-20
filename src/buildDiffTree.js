import _ from 'lodash';

const isObjNotArr = (val) => _.isObject(val) && !_.isArray(val);

const buildDiffTree = (obj1, obj2 = obj1) => {
  const keys = Object.keys({ ...obj1, ...obj2 }).sort();
  const result = keys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    const parsedValue1 = isObjNotArr(value1) ? buildDiffTree(value1) : value1;
    const parsedValue2 = isObjNotArr(value2) ? buildDiffTree(value2) : value2;
    if (value1 === undefined) {
      acc.push({ key, value: parsedValue2, status: 'added' });
    } else if (value2 === undefined) {
      acc.push({ key, value: parsedValue1, status: 'removed' });
    } else if (value1 === value2 && !_.isObject(value1)) {
      acc.push({ key, value: value1, status: 'no_changes' });
    } else if (isObjNotArr(value1) && isObjNotArr(value2)) {
      acc.push({ key, value: buildDiffTree(value1, value2), status: 'no_changes' });
    } else {
      acc.push({ key, value: parsedValue1, status: 'removed' });
      acc.push({ key, value: parsedValue2, status: 'added' });
    }
    return acc;
  }, []);
  return result;
};

export default buildDiffTree;
