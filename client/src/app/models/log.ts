export class Log {
  subject: {
    userId: string
    name: string
    email: string
    picture: string
  }
  predicate: {
    verb: string
    object: string
    objectType: string
    previousState: string
    currentState: string
  }
  date: any
}
