BASE = .
ISTANBUL = ./node_modules/.bin/istanbul
COVERAGE_OPTS = --lines 80 --statements 80 --branches 80 --functions 80

data: 
	node ./populator/run.js

test:
	node ./test/run.js

cover:
	@ echo ++++++++++++++++++++++++++++++++++++++++++++++++++++
	@ echo runing test coverage
	$(ISTANBUL) cover test/run.js

check-coverage:
	@ echo ++++++++++++++++++++++++++++++++++++++++++++++++++++
	@ echo checking test coverage threshhold
	$(ISTANBUL) check-coverage $(COVERAGE_OPTS)

test-cov: cover check-coverage


server:
	node app


.PHONY: test server data