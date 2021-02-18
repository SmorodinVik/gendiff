import path from 'path';
import findDiff from '../src/findDiff.js';
import readAndParse from '../src/parsers.js';
import stylish from '../src/stylish.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expected = `{
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

describe.each([
  ['file1.json', 'file2.json', 'json/json'],
  ['file3.yml', 'file4.yaml', 'yaml/yml'],
  ['file1.json', 'file4.yaml', 'json/yml'],
])('Find differences:', (file1, file2, description) => {
  test(`${description}`, () => {
    const path1 = getFixturePath(file1);
    const path2 = getFixturePath(file2);
    const data1 = readAndParse(path1);
    const data2 = readAndParse(path2);
    const result = findDiff(data1, data2);
    expect(stylish(result)).toEqual(expected);
  });
});
