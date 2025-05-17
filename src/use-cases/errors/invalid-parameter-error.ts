export class InvalidParameterError extends Error {
  constructor(parameter: string) {
    super(`O campo ${parameter} é inválido.`)
  }
}
