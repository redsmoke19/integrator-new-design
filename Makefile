install:
	npm ci

lint:
	npx eslint .

stylelint:
	npx stylelint "dev/static/**/*.scss"
