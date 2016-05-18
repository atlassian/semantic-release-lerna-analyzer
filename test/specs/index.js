const { test } = require('tap');

const analyzer = require('../../dist');

test('derive version number from commits', (t) => {
  t.test('no change', (tt) => {
    tt.plan(2);

    analyzer({}, {
      commits: [{
        hash: 'asdf',
        message: 'chore: build script'
      }]
    }, (err, type) => {
      tt.error(err);
      tt.is(type, null)
    })
  });

  t.test('no change for features if component is unaffected', (tt) => {
    tt.plan(2);

    analyzer({}, {
      commits: [{
        hash: 'asdf',
        message: 'fix: nasty bug'
      }, {
        hash: '1234',
        message: 'fix(scope): even nastier bug'
      }]
    }, (err, type) => {
      tt.error(err);
      tt.is(type, null)
    })
  });

  //TODO: write tests for package based behaviour

  t.end()
});
