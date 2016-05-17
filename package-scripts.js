exports.scripts = {
  dev: 'cross-env NODE_ENV=development webpack-dev-server',
  ghPages: [
    'p-s build.ghPages',
    'gh-pages --dist example'
  ].join(' && '),
  build: {
    default: [
      'rimraf lib example build',
      'p-s --parallel build.lib,build.ghPages,build.dist,build.min'
    ].join(' && '),
    lib: 'cross-env NODE_ENV=production' +
    '     babel src --out-dir lib --source-maps --ignore src/example',
    ghPages: 'cross-env NODE_ENV=production BUILD=ghPages webpack',
    dist: 'cross-env NODE_ENV=production BUILD=dist webpack',
    min: 'cross-env NODE_ENV=production BUILD=min webpack'
  },
  prepublish: 'p-s --parallel build:lib,build:dist,build:min',
  test: {
    default: 'cross-env NODE_ENV=test babel-node test',
    dev: 'p-s test | tap-nyan',
    cov: 'cross-env NODE_ENV=test' +
    '     babel-node node_modules/isparta/bin/isparta cover' +
    '     --report text --report html --report lcov --dir reports/coverage test',
    e2e: 'cross-env NODE_ENV=development nightwatch-autorun'
  },
  lint: 'eslint --cache .',
  precommit: 'p-s lint',
  prepush: 'p-s test',
  postversion: 'git push --follow-tags',
  ci: {
    lint: [
      'eslint --debug . --format tap | tap-xunit > ${CIRCLE_TEST_REPORTS}/lint.xml',
      'test ${PIPESTATUS[0]} -eq 0'
    ].join(' && '),
    test: [
      'NODE_ENV=test babel-node test | tap-xunit > ${CIRCLE_TEST_REPORTS}/test.xml',
      'test ${PIPESTATUS[0]} -eq 0'
    ].join(' && '),
    cov: 'NODE_ENV=test babel-node node_modules/isparta/bin/isparta cover ' +
    '     --report text --report lcov --verbose --dir ${CIRCLE_ARTIFACTS}/coverage test/index.js',
    e2e: 'REPORT_DIR=${CIRCLE_TEST_REPORTS} LOG_DIR=${CIRCLE_ARTIFACTS}' +
    '     NODE_ENV=development nightwatch-autorun',
    codecov: 'cat ${CIRCLE_ARTIFACTS}/coverage/lcov.info | codecov'
  }
};
