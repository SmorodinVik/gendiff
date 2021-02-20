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

const expectedJSON = `[{"key":"common","value":[{"key":"follow","value":false,"status":"added"},{"key":"setting1","value":"Value 1","status":"no_changes"},{"key":"setting2","value":200,"status":"removed"},{"key":"setting3","value":true,"status":"removed"},{"key":"setting3","value":null,"status":"added"},{"key":"setting4","value":"blah blah","status":"added"},{"key":"setting5","value":[{"key":"key5","value":"value5","status":"no_changes"}],"status":"added"},{"key":"setting6","value":[{"key":"doge","value":[{"key":"wow","value":"","status":"removed"},{"key":"wow","value":"so much","status":"added"}],"status":"no_changes"},{"key":"key","value":"value","status":"no_changes"},{"key":"ops","value":"vops","status":"added"}],"status":"no_changes"}],"status":"no_changes"},{"key":"group1","value":[{"key":"baz","value":"bas","status":"removed"},{"key":"baz","value":"bars","status":"added"},{"key":"foo","value":"bar","status":"no_changes"},{"key":"nest","value":[{"key":"key","value":"value","status":"no_changes"}],"status":"removed"},{"key":"nest","value":"str","status":"added"}],"status":"no_changes"},{"key":"group2","value":[{"key":"abc","value":12345,"status":"no_changes"},{"key":"deep","value":[{"key":"id","value":45,"status":"no_changes"}],"status":"no_changes"}],"status":"removed"},{"key":"group3","value":[{"key":"deep","value":[{"key":"id","value":[{"key":"number","value":45,"status":"no_changes"}],"status":"no_changes"}],"status":"no_changes"},{"key":"fee","value":100500,"status":"no_changes"}],"status":"added"}]`;

describe.each(testData)('Test stylish, plain, json:', (file1, file2, description) => {
  test(`${description}`, () => {
    const path1 = getFixturePath(file1);
    const path2 = getFixturePath(file2);
    const resultStylish = genDiff(path1, path2, 'stylish');
    const resultPlain = genDiff(path1, path2, 'plain');
    const resultJSON = genDiff(path1, path2, 'json');
    expect(resultStylish).toEqual(expectedStylish);
    expect(resultPlain).toEqual(expectedPlain);
    expect(resultJSON).toEqual(expectedJSON);
  });
});

