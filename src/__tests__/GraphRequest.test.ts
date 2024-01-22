/**
 * WhatsApp NodeJS SDK.
 *
 * @since  2.0.0
 * @author Great Detail Ltd <info@greatdetail.com>
 * @author Dom Webber <dom.webber@hotmail.com>
 * @see    https://greatdetail.com
 */
import GraphRequest from "../GraphRequest/index.js";
import { describe, test, expect, jest } from "@jest/globals";

describe("GraphRequest", () => {
  describe("Construction with varying parameters", () => {
    test("When a forward slash is used as an endpoint, then the url should reflect that path", () => {
      // Arrange
      const endpoint = "/";

      // Act
      const graphRequest = GraphRequest.create(endpoint);

      // Assert
      expect(graphRequest.url).toBe(
        `https://graph.facebook.com/v18.0${endpoint}`,
      );
    });

    test("When a standard path is used as an endpoint, then the url should reflect that path", () => {
      // Arrange
      const endpoint = "/example/path/to/something";

      // Act
      const graphRequest = GraphRequest.create(endpoint);

      // Assert
      expect(graphRequest.url).toBe(
        `https://graph.facebook.com/v18.0${endpoint}`,
      );
    });

    test("When an alternative version is specified, then the url should reflect that version", () => {
      // Arrange
      const endpoint = "/path/to/something";
      const version = "v0.0";

      // Act
      const graphRequest = GraphRequest.create(endpoint, { version });

      // Assert
      expect(graphRequest.url).toBe(
        `https://graph.facebook.com/${version}/path/to/something`,
      );
    });

    test("When an alternative base url is specified, then the url should reflect that base url", () => {
      // Arrange
      const endpoint = "/path/to/something";
      const baseUrl = "https://example.com";

      // Act
      const graphRequest = GraphRequest.create(endpoint, { baseUrl });

      // Assert
      expect(graphRequest.url).toBe(`${baseUrl}/v18.0${endpoint}`);
    });

    test("When setting a header, the header should be accessible as a parameter as expected", () => {
      // Arrange
      const endpoint = "/path/to/something";
      const headerName = "Content-Type";
      const headerValue = "application/json";

      // Act
      const graphRequest = GraphRequest.create(endpoint, {
        headers: { [headerName]: headerValue },
      });

      // Assert
      expect(graphRequest.headers.get(headerName)).toBe(headerValue);
    });
  });

  describe("Calling the send method", () => {
    test("When the send method is called, then the response should be returned as expected", async () => {
      // Arrange
      const endpoint = "/path/to/something";
      const graphRequest = GraphRequest.create(endpoint);
      const mockFetch = jest.fn<typeof fetch>();
      const body = "exampleBody";
      mockFetch.mockReturnValue(Promise.resolve(new Response(body)));

      // Act
      const response = await graphRequest.send({
        fetch: mockFetch,
      });
      const responseText = await response.text();

      // Assert
      expect(mockFetch).toHaveBeenCalled();
      expect(mockFetch).toHaveBeenCalledWith(graphRequest.url, graphRequest);
      expect(responseText).toBe(body);
      expect(response.request).toBe(graphRequest);
    });

    test("When send-time header overrides are set, then the headers should be merged as expected at send-time", async () => {
      // Arrange
      const endpoint = "/path/to/something";
      const graphRequest = GraphRequest.create(endpoint, {
        headers: {
          "x-will-merge": "willMerge",
          "Content-Type": "willBeOverridden",
        },
      });
      const mockFetch = jest.fn<typeof fetch>();
      mockFetch.mockReturnValue(Promise.resolve(new Response()));

      // Act
      const response = await graphRequest.send({
        fetch: mockFetch,
        headers: {
          "Content-Type": "application/xml",
          "x-will-also-merge": "willAlsoMerge",
        },
      });

      // Assert
      expect(mockFetch).toHaveBeenCalled();
      expect(response.request).toBe(graphRequest);
      expect(response.request?.headers.get("Content-Type")).toBe(
        "application/xml",
      );
      expect(response.request?.headers.get("x-will-merge")).toBe("willMerge");
      expect(response.request?.headers.get("x-will-also-merge")).toBe(
        "willAlsoMerge",
      );
    });
  });
});
