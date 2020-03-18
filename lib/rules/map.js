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
      "CallExpression[callee.object.name='_'][callee.property.name='map'][arguments.length>1]": function (node) {
        const scope = node.parent;
        const [first, second] = node.arguments;
        const sourceCode = context.getSourceCode();
        const textFirstArg = sourceCode.getText(first);
        const textSecondArg = sourceCode.getText(second);

        const tokensBefore = sourceCode.getTokensBefore(node, { filter: token => token.type === "Identifier" && token.value === "_" });
        for (let i = 0; i < tokensBefore.length; i++) {
          const tokenNode = sourceCode.getNodeByRangeIndex(sourceCode.getIndexFromLoc(tokensBefore[i].loc.start));
          if (tokenNode.parent.type === "AssignmentExpression") {
            return;
          }
        }
        
        if (scope.type === "ConditionalExpression") {
          if (sourceCode.getText(scope.test) === `Array.isArray(${textFirstArg})`) {
            return;
          }
        }

        if (first.type === "ObjectExpression") {
          return;
        }

        function fixer(fixer) {
          if (first.type === "ArrayExpression") {
            return fixer.replaceText(node, `${textFirstArg}.map(${textSecondArg})`);
          }
          return fixer.replaceText(node, `(Array.isArray(${textFirstArg})) ? ${textFirstArg}.map(${textSecondArg}) : _.map(${textFirstArg}), ${textSecondArg}`);
        };

        context.report({
          node: node,
          message: 'This is construction _.map can be replaced by Array.map',
          fix: fixer
        });
      }
    }
  }
};
