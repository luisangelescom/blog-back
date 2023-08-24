export class ErrorResponse extends Error {
  constructor (name: string, stack?: { [key: string]: string } | string) {
    super(name)
    this.name = name

    // use Narrowing ts
    if (typeof stack === 'string') {
      this.stack = stack
    } else {
      try {
        this.stack = JSON.stringify(stack)
      } catch (error) {
        this.stack = JSON.stringify({ error: 'Server Error' })
      }
    }
  }
}
