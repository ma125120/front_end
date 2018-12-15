const Base = require('./base.js');
const fs = require('fs-extra');

var sig = require('tls-sig-api');
var config = {
    "sdk_appid": 'you',
    "expire_after": 180 * 24 * 3600,
    "private_key": "key/private.key",
    "public_key": "key/private.key"
}

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }
  testAction() {
    console.log(`text: ${ this.$formData.text.toString('utf8') }`);
    return this.ctx.success({
      lists: this.$formData,
    }, '获取成功')
  }

  getSigAction() {
    var sig = require('tls-sig-api');
    var openid = this.$formData.openid;
    var sig = new sig.Sig(config),
        result = sig.genSig(openid || "oxjoZ4wpXVTm2V41HSQAk1FfwSmY");
    this.ctx.success({
      openid,
      UserSig: result,
    }, "获取成功")
  }

  formAction() {
    console.log(this.$formData.formId);
  }
};
