describe('command line arguments helper for node.js', function() {
  var argumentsHelper = require(__dirname + '/../lib/arguments-helper').argumentsHelper

  describe('.toOptions', function() {
    describe('any', function() {
      it('converts arguments to options hash', function() {
        expect(argumentsHelper.toOptions({some: 'default'}, ['some=overriden'])).toEqual({some: 'overriden'})
      })

      it('keeps default value if not overriden', function() {
        expect(argumentsHelper.toOptions({some: 'default'}, [])).toEqual({some: 'default'})
      })

      it('ignores arguments not defined in default options', function() {
        expect(argumentsHelper.toOptions({}, ['some=any'])).toEqual({})
      })

      it('converts empty arguments to empty hash', function() {
        expect(argumentsHelper.toOptions({}, [])).toEqual({})
      })

      it('leaves default options unmodified', function() {
        var defaultOptions = {key: 'original'}
        argumentsHelper.toOptions(defaultOptions, ['key=overriden'])
        expect(defaultOptions.key).toEqual('original')
      })
    })

    describe('with special values', function() {
      it('converts booleans', function() {
        expect(argumentsHelper.toOptions({some: true}, ['some=false'])).toEqual({some: false})
        expect(argumentsHelper.toOptions({some: false}, ['some=true'])).toEqual({some: true})
      })

      it('converts null', function() {
        expect(argumentsHelper.toOptions({some: 'default'}, ['some=null'])).toEqual({some: null})
      })

      it('converts numbers', function() {
        expect(argumentsHelper.toOptions({some: 'default'}, ['some=123'])).toEqual({some: 123})
      })

      it('allows = symbols in value', function() {
        expect(argumentsHelper.toOptions({some: 'default'}, ['some=foo=bar'])).toEqual({some: 'foo=bar'})
      })
    })

    describe('with some realistic values', function() {
      it('just works', function() {
        var defaultOptions = {
          port: 8080,
          path: false,
          protocol: 'tcp',
          mimeType: 'application/json'
        }
        var arguments = [
          'mimeType=application/xml',
          'port=9000',
          'path=/Users/example/path/to/stuff'
        ]
        var expected = {
          protocol: 'tcp',
          port: 9000,
          mimeType: 'application/xml',
          path: '/Users/example/path/to/stuff'
        }
        expect(argumentsHelper.toOptions(defaultOptions, arguments)).toEqual(expected)
      })
    })
  })
})
