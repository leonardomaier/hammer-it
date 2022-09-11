import fetch from "cross-fetch"

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH'

interface Headers { [key: string]: string }

class HammerIt {

  private url: string
  private method: HttpMethod | string  | undefined
  private payload: string | (() => string) | undefined
  private headers: Headers | undefined
  private times: number | undefined
  private delay: number | undefined

  constructor(url: string) {
    this.url = url
  }

  withMethod(method: HttpMethod) {
    this.method = method
    return this
  }

  withPayload(payload: Object) {
    this.payload = JSON.stringify(payload)
    return this
  }

  withHeaders(headers: Headers) {
    this.headers = headers
    return this
  }

  forManyTimes(times: number) {
    this.times = times
    return this
  }

  delayingMsPerRequest(msDelay: number) {
    this.delay = msDelay
    return this;
  }

  private async sleep(ms: number) { 
    return await new Promise(resolve => setTimeout(resolve, ms))
  }

  async start() {

    console.log('Welcome to HammerIt!\n')

    if (!this.times) return;

    for (let i = 0; i < this.times; i++) {

      const request: RequestInit = {
        method: this.method as string,
        headers: this.headers,
        body: null
      }

      request.body = typeof this.payload === 'function' ? this.payload() : this.payload

      console.log(`Making request #${i} with following payload ${this.payload}`)

      const response = await fetch(`${this.url}`, request);

      if (response.status === 200) {
        console.log(`Request #${i} done with status 200\n\n`)
      } else {
        console.log(`Request #${i} failed with status ${response.status}\n\n`)
      }
      
      if (this.delay) {
        await this.sleep(this.delay)
      }
    }
  }
}

export const hammer = (url: string) => new HammerIt(url)
