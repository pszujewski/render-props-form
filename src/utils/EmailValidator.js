export default class EmailValidator {
  constructor() {
    this.regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  isValid(email) {
    if (!email || typeof email !== "string") {
      return false;
    }

    return this.emailMatchesRegEx(email);
  };

  emailMatchesRegEx(email) {
    return this.regexp.test(email.trim().toLowerCase());
  }
}