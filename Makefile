install:
	npm install

try:
	gendiff -f json testjsons/file7.yml testjsons/file8.yaml

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage

publish:
	npm publish --dry-run

link:
	npm link
