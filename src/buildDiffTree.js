import _ from 'lodash';

const isObjNotArr = (val) => _.isObject(val) && !_.isArray(val);

const buildDiffTree = (obj1, obj2) => {
  const keys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));
  const result = keys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (value1 === undefined) {
      return [...acc, {
        type: 'added', key, oldValue: null, newValue: value2, children: null,
      }];
    }
    if (value2 === undefined) {
      return [...acc, {
        type: 'removed', key, oldValue: value1, newValue: null, children: null,
      }];
    }
    if (value1 === value2) {
      return [...acc, {
        type: 'no_changes', key, oldValue: value1, newValue: value2, children: null,
      }];
    }
    if (isObjNotArr(value1) && isObjNotArr(value2)) {
      return [...acc, {
        type: 'changed', key, oldValue: value1, newValue: value2, children: buildDiffTree(value1, value2),
      }];
    }
    return [...acc, {
      type: 'updated', key, oldValue: value1, newValue: value2, children: null,
    }];
  }, []);
  return result;
};

export default buildDiffTree;
