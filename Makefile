
build: components index.js
	@component build --dev

components: component.json
	@component install --dev

test:
	@component test phantom

test-browser:
	@component test browser

clean:
	rm -fr build components

.PHONY: clean test
