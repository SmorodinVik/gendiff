install:
	npm install
try:
	gendiff /Users/Smorodina/Desktop/Projects/frontend-project-lvl2/testjsons/file5.json testjsons/file6.json
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage
