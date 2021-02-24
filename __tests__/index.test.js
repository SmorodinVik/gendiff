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

const expectedJSON = '[{"type":"changed","key":"common","oldValue":{"setting1":"Value 1","setting2":200,"setting3":true,"setting6":{"key":"value","doge":{"wow":""}}},"newValue":{"follow":false,"setting1":"Value 1","setting3":null,"setting4":"blah blah","setting5":{"key5":"value5"},"setting6":{"key":"value","ops":"vops","doge":{"wow":"so much"}}},"children":[{"type":"added","key":"follow","oldValue":null,"newValue":false,"children":null},{"type":"no_changes","key":"setting1","oldValue":"Value 1","newValue":"Value 1","children":null},{"type":"removed","key":"setting2","oldValue":200,"newValue":null,"children":null},{"type":"updated","key":"setting3","oldValue":true,"newValue":null,"children":null},{"type":"added","key":"setting4","oldValue":null,"newValue":"blah blah","children":null},{"type":"added","key":"setting5","oldValue":null,"newValue":{"key5":"value5"},"children":null},{"type":"changed","key":"setting6","oldValue":{"key":"value","doge":{"wow":""}},"newValue":{"key":"value","ops":"vops","doge":{"wow":"so much"}},"children":[{"type":"changed","key":"doge","oldValue":{"wow":""},"newValue":{"wow":"so much"},"children":[{"type":"updated","key":"wow","oldValue":"","newValue":"so much","children":null}]},{"type":"no_changes","key":"key","oldValue":"value","newValue":"value","children":null},{"type":"added","key":"ops","oldValue":null,"newValue":"vops","children":null}]}]},{"type":"changed","key":"group1","oldValue":{"baz":"bas","foo":"bar","nest":{"key":"value"}},"newValue":{"foo":"bar","baz":"bars","nest":"str"},"children":[{"type":"updated","key":"baz","oldValue":"bas","newValue":"bars","children":null},{"type":"no_changes","key":"foo","oldValue":"bar","newValue":"bar","children":null},{"type":"updated","key":"nest","oldValue":{"key":"value"},"newValue":"str","children":null}]},{"type":"removed","key":"group2","oldValue":{"abc":12345,"deep":{"id":45}},"newValue":null,"children":null},{"type":"added","key":"group3","oldValue":null,"newValue":{"deep":{"id":{"number":45}},"fee":100500},"children":null}]';

describe.each(testData)('Test stylish, plain, json:', (file1, file2, description) => {
  test(`${description}`, () => {
    const path1 = getFixturePath(file1);
    const path2 = getFixturePath(file2);
    const resultStylish = genDiff(path1, path2);
    const resultPlain = genDiff(path1, path2, 'plain');
    const resultJSON = genDiff(path1, path2, 'json');
    expect(resultStylish).toEqual(expectedStylish);
    expect(resultPlain).toEqual(expectedPlain);
    expect(resultJSON).toEqual(expectedJSON);
  });
});
