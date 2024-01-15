const { alias, configPaths } = require('react-app-rewire-alias');
const { resolve } = require('path');

module.exports = function override(config) {
    config.output.path = resolve(__dirname, 'docs');
    return alias(configPaths('./tsconfig.json'))(config);
};
