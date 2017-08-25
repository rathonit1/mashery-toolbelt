#!/usr/bin/env node
'use strict';

require('dotenv').config();

const vorpal = require('vorpal')();
const spinner = require('../src/spinner');
const fetch = require('node-fetch');

const chalk = vorpal.chalk;

function verifyConfig() {
}

function errorHandler(ctx, s, cb) {
  return (e) => {
    if (s) {
      s.stop(true);
    }

    ctx.log(chalk.red(`\nError: ${e.message}`));
    if (Array.isArray(e.errors)) {
      e.errors.forEach(err => ctx.log(chalk.yellow(` ${err.dataPath}: ${err.message}`)));
    }
    cb();
  };
}

vorpal
  .command('create-errorset', 'Create probem+json Mashery errorset for an API based on adidas API Guidelines')
  .action(function (args, callback) {
    this.log(chalk.yellow('TODO'));
    callback();
  });

vorpal
  .command('ls', 'List existing APIs')
  .action(function (args, callback) {
    const s = spinner();
    s.start();

    const url = `${process.env.MASHERY_HOST}/rest/services/`
    this.log(`Querying ${url}`);

    fetch(url)
      .then((response) => {
        s.stop(true);
        if (!response.ok) {
          throw Error(response.statusText);
        }

        callback();
      }).catch(errorHandler(this, s, callback));

  });

vorpal
  .command('dbg-info', 'Prints debug information')
  .action(function (args, callback) {
    this.log(`Mashery host: ${process.env.MASHERY_HOST}`);
    this.log(`Mashery token: ${process.env.MASHERY_KEY}`);
    callback();
  });

vorpal
  .delimiter('mashery-toolbelt$')
  .show();