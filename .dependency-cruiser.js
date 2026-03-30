module.exports = {
  forbidden: [
    {
      name: 'no-domain-deps',
      from: { path: '^packages/domain' },
      to: { pathNot: '^packages/domain' }
    },
    {
      name: 'application-only-domain',
      from: { path: '^packages/application' },
      to: { pathNot: '^packages/(domain|application)' }
    }
  ]
};
