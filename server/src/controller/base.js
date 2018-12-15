const dbType = think.config("dbType");

module.exports = class extends think.Controller {
  __before() {

    // let isOption = this.ctx.method == "OPTIONS";

    // this.setCorsHeader();
    // if(isOption){
    //   this.end();
    //   return false;
    // }

    this.$formData = Object.assign({}, this.get(), this.post());
  }
  setCorsHeader(){
    this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
    this.header("Access-Control-Allow-Credentials", "true");
    this.header("Access-Control-Allow-Headers", this.header("Access-Control-Request-Headers") || "*");
    this.header("Access-Control-Request-Method", this.header("Access-Control-Request-Method") || "*");
  }

  constructor(...arg) {
    super(...arg);
    this.mymodel = this[dbType];
  }

  __after() {

  }

};
