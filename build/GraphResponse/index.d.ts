export default class GraphResponse<T = unknown> extends Response {
    json(): Promise<T>;
}
