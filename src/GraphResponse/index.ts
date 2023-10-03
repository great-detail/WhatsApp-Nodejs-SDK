export default class GraphResponse<T = unknown> extends Response {
  public override json(): Promise<T> {
    return super.json();
  }
}
