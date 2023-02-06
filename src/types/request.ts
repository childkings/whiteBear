export namespace request {
  export interface requestParams {
    [key: string]: any
  }
  export interface asyncRequest {
    url: string,
    params: requestParams,
    requestType: 'get' | 'post' | 'put' | 'delete'
  }
}