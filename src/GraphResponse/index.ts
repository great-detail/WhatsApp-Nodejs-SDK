/**
 * Graph API Response.
 *
 * @since 2.0.0
 * @author Dom Webber <dom.webber@hotmail.com>
 */
export default class GraphResponse<T = unknown> extends Response {
  public override json(): Promise<T> {
    return super.json();
  }
}
