'use strict';

const createTestRunner = require('../../help/browsertimeRunner').createTestRunner,
  assert = require('assert');

let BROWSERS = ['chrome', 'firefox'];

describe('Info', function() {
  this.timeout(60000);

  BROWSERS.forEach(function(browser) {

    describe('browser:' + browser, function() {

      const runner = createTestRunner(browser, 'info');

      before(() => runner.start(browser));

      after(() => runner.stop());


      it('Should be able to find the assets inside the head tag', function() {
        return runner.run('head.js')
          .then((result) => {
            assert.strictEqual(result.jssync.length, 1);
            assert.strictEqual(result.jsasync.length, 1);
            assert.strictEqual(result.css.length, 2);
          });
      });

      it('We should be able to identify a AMP page', function() {
        return runner.run('amp.js')
          .then((result) => {
            assert.strictEqual(result, '1450396666888');
          });
      });

      it('We should be able to identify the connection type', function() {
        return runner.run('connectionType.js')
          .then((result) => {
              assert.strictEqual(result !== 'unknown', true);
          });
      });

      it('We should be able to find iframes', function() {
        return runner.run('iframes.js')
          .then((result) => {
            assert.strictEqual(result, 2);
          });
      });

      it('We should be able to get the title', function() {
        return runner.run('documentTitle.js')
          .then((result) => {
            assert.strictEqual(result, 'Document title');
          });
      });

      it('We should be able to get the document height', function() {
        return runner.run('documentHeight.js')
          .then((result) => {
            assert.strictEqual(result > 0, true);
          });
      });

      it('We should be able to get the document width', function() {
        return runner.run('documentWidth.js')
          .then((result) => {
            assert.strictEqual(result > 0, true);
          });
      });

      it('We should be able to count the DOM depth', function() {
        return runner.run('domDepth.js')
          .then((result) => {
            assert.strictEqual(result.avg, 3);
            assert.strictEqual(result.max, 4);
          });
      });

      it('We should be able to get the DOM elements', function() {
        return runner.run('domElements.js')
          .then((result) => {
            assert.strictEqual(result, 26);
          });
      });

      it('We should be able to get the local storage size', function() {
        return runner.run('localStorageSize.js')
          .then((result) => {
            assert.strictEqual(result > 0, true);
          });
      });

      it('We should be able to get the session storage size', function() {
        return runner.run('sessionStorageSize.js')
          .then((result) => {
            assert.strictEqual(result > 0, true);
          });
      });

      it('We should be able to get the window size', function() {
        return runner.run('windowSize.js')
          .then((result) => {
            assert.strictEqual(result != undefined, true);
          });
      });

      it('We should be able to get resource hints', function() {
        return runner.run('resourceHints.js')
          .then((result) => {
            assert.strictEqual(result.prerender[0], 'http://0.0.0.0:8282/info/amp.html', 'Could not fetch prerender');
            assert.strictEqual(result.preconnect[0], 'http://example.com/', 'Could not fetch preconnect');
            assert.strictEqual(result.prefetch[0], 'http://0.0.0.0:8282/info/js/body.js', 'Could not fetch prefetch');
            assert.strictEqual(result['dns-prefetch'][0], 'http://example.com/', 'Could not fetch dns-prefetch');
          });
      });
    });
  });
});
