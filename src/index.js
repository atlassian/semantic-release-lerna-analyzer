import commitAnalyzer from '@semantic-release/commit-analyzer';

module.exports = function (pluginConfig, config, cb) {
  const {pkg, commits} = config;
  const relevantCommits = commits.filter(({message}) => {
    const affectsLine = message.split('\n\n')[1];
    return affectsLine && affectsLine.indexOf('affects:') === 0 && affectsLine.indexOf(pkg.name) > -1;
  });

  commitAnalyzer(pluginConfig, Object.assign(config, {commits: relevantCommits}), function (err, type) {
    cb(err, type);
  });
};
