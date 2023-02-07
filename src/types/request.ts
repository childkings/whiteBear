import type { Ref } from 'vue'
export namespace request {
  export interface requestParams {
    [key: string]: any
  }
  export interface asyncRequest {
    url: string,
    params: requestParams,
    requestType: 'get' | 'post' | 'put' | 'delete'
  }
  export type asyncRequestRef = Ref<asyncRequest>

  export type responseParams = requestParams
}