import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const testData = [
  ['file1.json', 'file2.json', 'json/json'],
  ['file3.yml', 'file4.yaml', 'yaml/yml'],
  ['file1.json', 'file4.yaml', 'json/yml'],
];

const expectedStylish = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const expectedPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

describe.each(testData)('Test stylish:', (file1, file2, description) => {
  test(`${description}`, () => {
    const path1 = getFixturePath(file1);
    const path2 = getFixturePath(file2);
    const result = genDiff(path1, path2, 'stylish');
    expect(result).toEqual(expectedStylish);
  });
});

describe.each(testData)('Test plain:', (file1, file2, description) => {
  test(`${description}`, () => {
    const path1 = getFixturePath(file1);
    const path2 = getFixturePath(file2);
    const result = genDiff(path1, path2, 'plain');
    expect(result).toEqual(expectedPlain);
  });
});
