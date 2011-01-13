Simple command line arguments helper for node.js
================================================

Converts command line arguments to a JavaScript options hash.

When running

    $ node my-node-app.js port=8003 path=/Users/mileskin/test

and my-node-app.js has

    var argumentsHelper = require(__dirname + '/support/arguments-hlper').argumentsHelper

    var defaultOptions = {
      port: 9000,
      path: '/some/default/path',
      username: 'default'
    }

    var options = argumentsHelper.toOptions(defaultOptions, process.argv)

Then `options` will be

    {
      port: 8003,
      path: '/Users/mileskin/test',
      username: 'default'
    }

See `spec/arguments-helper-spec.js` for full specification.

To run the specs:

    watch -n 1 ./run-specs.sh

