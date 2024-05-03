/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */

import greatdetailESLint from "@great-detail/eslint-config";

/** @type {import("eslint").Linter.FlatConfig[] & import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default [
  ...greatdetailESLint(),
];