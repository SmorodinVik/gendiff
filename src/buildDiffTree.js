import _ from 'lodash';

const makeNode = (type, key, oldValue, newValue = null, children = null) => ({
  type, key, oldValue, newValue, children,
});

const buildDiffTree = (data1, data2) => {
  const keys = _.sortBy(Object.keys({ ...data1, ...data2 }));

  return keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (value1 === undefined) {
      return makeNode('added', key, null, value2);
    }
    if (value2 === undefined) {
      return makeNode('removed', key, value1);
    }
    if (value1 === value2) {
      return makeNode('no_changes', key, value1, value2);
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return makeNode('changed', key, value1, value2, buildDiffTree(value1, value2));
    }
    return makeNode('updated', key, value1, value2);
  });
};

export default buildDiffTree;
