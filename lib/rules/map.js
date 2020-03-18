/**
 * @fileoverview Search and replace lodash _.map, on native Array.map if this possible
 * @author Andrey Pogorelov
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  type: 'suggestion',
  meta: {
    docs: {
      description: "Search and replace lodash _.map, on native Array.map if this possible",
      category: "Fill me in",
      recommended: false
    },
    fixable: 'code',  // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create: function (context) {
    return {
      MemberExpression(node) {
        const vision = node.parent;
        const [first, second] = vision.arguments;
        const sourceCode = context.getSourceCode();
        
        if (node.object.name === "_" && node.property.name === "map" && first.type === 'ArrayExpression') {

          context.report({
            node,
            message: "This is construction _.map can be replaced by Array.map",
            fix: function (fixer) {
              const replaceCode = sourceCode.getText(first) + '.map' + sourceCode.getText(second);

              return fixer.replaceText(vision, replaceCode);
            }
          });
        }
      }
    }
  }
};
