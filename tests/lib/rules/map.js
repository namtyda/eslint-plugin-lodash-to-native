/**
 * @fileoverview Search and replace lodash _.map, on native Array.map if this possible
 * @author Andrey Pogorelov
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/map"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

let ruleTester = new RuleTester();
let errorObject = {
  message: 'This is construction _.map can be replaced by Array.map',
  type: 'MemberExpression',
};
ruleTester.run('lodash-to-native', rule, {

  valid: [
    {
      code: '[1, 2, 3].map(fn)'
    },
  ],

  invalid: [
    {
      code: '_.map([1, 2, 3], fn)',
      errors: [errorObject],
    },
  ],
});