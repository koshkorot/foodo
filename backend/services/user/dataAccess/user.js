const users = [];


module.exports = {
  async insert(user){
    if (users.find(u => u.phoneNumber === user.phoneNumber)) {
      const error = new Error();
      error.codeString = 'USER_ALREADY_EXISTS';
      throw error;
    }
    user.id = users.length + 1;
    users.push(user);
    return user;
  },

  async findByUserPass(username, password) {
    return users.find(u => u.username === username && u.password === password);
  }
};
