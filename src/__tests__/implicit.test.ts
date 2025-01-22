/**
 * Great Detail Support System.
 *
 * @copyright 2025 Great Detail Ltd
 * @author    Great Detail Ltd <info@greatdetail.com>
 * @author    Dom Webber <dom.webber@greatdetail.com>
 * @see       https://greatdetail.com
 */

import assert from "node:assert";
import test, { describe } from "node:test";

describe("Implicit Tests", () => {
  describe("Should not fail", () => {
    test("Transpilation should suceed", () => {
      assert.equal(true, true);
    });

    test("Class extension should transpile properly", () => {
      // Arrange
      class Parent {}
      class Child extends Parent {}

      // Act
      const child = new Child();

      // Assert
      assert(child instanceof Child);
    });
  });
});
