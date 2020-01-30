class User {
  constructor(user) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phoneNumber = user.phoneNumber;
    this.role = user.role;
  }
}

module.exports = User;