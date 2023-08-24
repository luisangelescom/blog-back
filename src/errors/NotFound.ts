export class ErrorResponse extends Error {
  constructor (name: string, stack = { error: 'Error when obtaining the stack' }) {
    super(name)
    this.name = name
    try {
      this.stack = JSON.stringify(stack)
    } catch (error) {
      this.stack = JSON.stringify({ error: 'Error when obtaining the stack' })
    }
  }
}
