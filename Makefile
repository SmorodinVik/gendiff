install:
	npm install
try:
	gendiff /Users/Smorodina/Desktop/Projects/frontend-project-lvl2/testjsons/file1.json testjsons/file2.json
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage
