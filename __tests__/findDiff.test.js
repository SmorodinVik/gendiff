import path from 'path';
import findDiff from '../src/findDiff.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expected = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';

describe.each([
  ['file1.json', 'file2.json', 'json/json'],
  ['file3.yaml', 'file4.yml', 'yaml/yml'],
  ['file1.json', 'file4.yml', 'json/yml'],
])('Find differences:', (file1, file2, description) => {
  test(`${description}`, () => {
    const path1 = getFixturePath(file1);
    const path2 = getFixturePath(file2);
    const result = findDiff(path1, path2);
    expect(result).toEqual(expected);
  });
});
