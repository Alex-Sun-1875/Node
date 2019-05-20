TEST = $(shell ls -S `find ../test -type f -name "*.js" -print`)
TESTTIMEOUT = 5000
MOCHA_OPTS =
REPORTER = spec

install:
	@$PYTHON=`which python` NODE_ENV=test npm install

test:
	@NODE_ENV=test ../node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	--timeout $(TESTTIMEOUT) \
	$(MOCHA_OPTS) \
	$(TEST)

test-cov:
	@$(MAKE) test REPORTER=dot
	@$(MAKE) test MOCHA_OPTS='--require blanket' REPORTER=html-cov > coverage.html
	@$(MAKE) test MOCHA_OPTS='--require blanket' REPORTER=travis-cov

reinstall: clean

@$(MAKE) install

clean:
	@rm -rf ../mode_modules

build:
	@../bin/combo views .

.PHONY:
	test test-cov clean install reinstall
