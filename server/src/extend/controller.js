const jwt = require('../lib/jwt');

module.exports = {
  get jwt() {
    let token = this.header('token') || this.$formData.token;

    jwt.get = function(key) {
      let obj = jwt.verify(token);
      if(key) {
        return obj[key]
      }
      return obj;
    }
    
    return jwt;
  }
}