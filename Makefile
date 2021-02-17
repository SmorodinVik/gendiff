install:
	npm install
try:
	gendiff /Users/Smorodina/Desktop/Projects/frontend-project-lvl2/testjsons/file3.yaml testjsons/file4.yml
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage
