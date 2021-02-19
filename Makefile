install:
	npm install
try:
	gendiff /Users/Smorodina/Desktop/Projects/frontend-project-lvl2/testjsons/file7.yml testjsons/file8.yaml
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage
publish:
	npm publish --dry-run
