export default class GraphResponse<T = unknown> extends Response {
  public json(): Promise<T> {
    return super.json();
  }
}
