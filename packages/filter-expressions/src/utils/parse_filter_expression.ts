/**
 * Copyright (c) 2023 Google LLC
 * SPDX-License-Identifier: MIT
 */
import type { Parser } from 'pegjs';
import { generate } from 'pegjs';
import type {
  FilterASTNode,
  FilterExpressionType,
  TransformFunction,
  UserAttributeWithValue,
} from '../types';
import { getNumberFromString } from './number/get_number_from_string';
import { getMatchesAdvancedNode } from './get_matches_advanced_node';
import { transformAST } from './transform/transform_ast';
import { userAttributeTransform } from './transform/userAttributeTransform';
import { typeToGrammar } from './type_to_grammar';
import { SyntaxError as StringSyntaxError, parse as StringParse } from './compiled_grammars/string_grammar';
import { SyntaxError as NumberSyntaxError, parse as NumberParse } from './compiled_grammars/number_grammar';
import { SyntaxError as DateSyntaxError, parse as DateParse } from './compiled_grammars/date_grammar';
import { SyntaxError as DateTimeSyntaxError, parse as DateTimeParse } from './compiled_grammars/date_time_grammar';
import { SyntaxError as LocationSyntaxError, parse as LocationParse } from './compiled_grammars/location_grammar';
import { SyntaxError as TierSyntaxError, parse as TierParse } from './compiled_grammars/tier_grammar';

/**
 * Generates a parser from a PEGjs grammar and caches the result
 */
const generateParser = (() => {
  const parserCache: { [key: string]: Parser } = {};
  return (type: string, grammar: string) => {
    if (!parserCache[type]) {
      switch (type) {
        case 'string':
          parserCache[type] = { parse: StringParse, SyntaxError: StringSyntaxError };
          break;
        case 'number':
          parserCache[type] = { parse: NumberParse, SyntaxError: NumberSyntaxError };
          break;
        case 'date':
          parserCache[type] = { parse: DateParse, SyntaxError: DateSyntaxError };
          break;
        case 'date_time':
          parserCache[type] = { parse: DateTimeParse, SyntaxError: DateTimeSyntaxError };
          break;
        case 'location':
          parserCache[type] = { parse: LocationParse, SyntaxError: LocationSyntaxError };
          break
        case 'tier':
          parserCache[type] = { parse: TierParse, SyntaxError: TierSyntaxError };
          break
        default:
          parserCache[type] = generate(grammar);
          break;
      }
    }
    return parserCache[type];
  };
})();

/**
 * Variables used inside grammars
 */
export const parserOptions = { Object, getNumberFromString };

/**
 * A functions that uses a grammar of type type to parse an expression and returns an AST
 */
export const parseFilterExpression = (
  type: FilterExpressionType,
  expression: string,
  userAttributes?: UserAttributeWithValue[]
): FilterASTNode => {
  const {
    grammar,
    anyvalue,
    transform = (root: FilterASTNode) => root,
  } = typeToGrammar(type);
  if (expression === '') {
    return anyvalue;
  }
  try {
    const parser = generateParser(type, grammar);
    const transforms: TransformFunction[] = [
      userAttributeTransform(userAttributes),
      transform,
    ];
    return transformAST(parser.parse(expression, parserOptions), transforms);
  } catch (error) {
    return getMatchesAdvancedNode(expression);
  }
};
