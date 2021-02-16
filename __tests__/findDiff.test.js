import path from 'path';
import findDiff from '../src/findDiff.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('find differences', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const result = findDiff(path1, path2);
  const expected = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';
  expect(result).toEqual(expected);
});
