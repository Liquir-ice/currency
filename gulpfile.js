'use strict';

var elixir = require('laravel-elixir');
require('laravel-elixir-wiredep');
require('laravel-elixir-useref');
require('laravel-elixir-browser-sync');
require('laravel-elixir-serve');
require('laravel-elixir-sync');
require('laravel-elixir-jshint');
require('laravel-elixir-clean');
require('laravel-elixir-style-guide');
require('laravel-elixir-apidoc');
require('laravel-elixir-postcss');

elixir(function (mix) {
    var port = 8000;

     mix.clean()
        .wiredep()
        .jshint()
        .sync('resources/assets/js/**/*.*', 'public/js')
        .sync('resources/assets/img/**/*.*', 'public/img')
        .postcss('**/*.css', {
            plugins:[ //postcss's plugins
              require('postcss-mixins'),
              require('postcss-nested'),
              require('postcss-simple-vars'),
            ]
        });

    if (elixir.config.production) {
        mix.useref({src: false})
            .version(['js/*.js', 'css/*.css'])
            .styleGuide();

    } else {
        mix.serve({
            port: port
        }).browserSync(null, {
            proxy: 'localhost:' + port,
            reloadDelay: 500
        });
    }
});
