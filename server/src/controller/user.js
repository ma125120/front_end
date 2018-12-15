const Base = require('./base.js');
var jwt = require('jsonwebtoken');
const dbType = think.config("dbType");
const fs = require('fs');
const path = require('path');
const rename = think.promisify(fs.rename, fs);

module.exports = class extends Base {
  async getListAction() {
    // if(!this.checkUser()) return;
    let result = await this.mymodel('user').getList(this.$formData);
    
    return this.ctx.success(result, '获取成功')
  }

  async getByDateAction() {
    if(!this.checkUser()) return;
    let lists = await this.mymodel('user').getByDate(this.$formData);
    
    return this.ctx.success({
      lists: lists,
    }, '获取成功')
  }

  async editAction() {
    let $formData = this.$formData,
        info = this.jwt.get();
    if($formData.id !== info.id && !this.checkUser()) return;

    //处理文件
    $formData = await this.handleFile($formData);
    
    let result = await this.mymodel('user').edit($formData);
    
    this.signUser(result, '修改成功', '修改失败', false);
  }

  async loginAction() {

    let result = await this.mymodel('user').login(this.$formData);

    this.signUser(result);
  }

  async registerAction() {

    let result = await this.mymodel('user').register(this.$formData).catch(err => { console.log(err) });

    this.signUser(result, '注册成功', '该用户已存在，无法注册');
  }

  async existAction() {
    let flag = await this.mymodel('user').exist(this.$formData);
    return this.ctx[ flag ? 'fail' : 'success' ]( flag ? 400 : '', flag ? '该用户已经存在' : '该用户不存在');
  }

  async addUserAction() {
    let $formData = this.$formData,
        info = this.jwt.get();
    if(!this.checkUser()) return;

    // 处理文件
    $formData = await this.handleFile($formData);
    console.log('sda', $formData)
    let result = await this.mymodel('user').addUser($formData);

    this.signUser(result, '添加成功', '该用户已存在，添加失败', false);
  }

  async editPwdAction() {
    
    let result = await this.mymodel('user').editPwd(this.$formData, this.jwt.get('id'));

    if(result) {
      return this.ctx.success({
        result,
        token: this.jwt.sign(result),
      }, '更新成功')
    }

    return this.ctx.fail(400, '修改密码失败,请确认你的密码是否正确');
    
  }

  async testAction() {
    let result = this.jwt.get();
    if(result.errmsg) {
      this.ctx.fail(400, result.errmsg)
    } else {
      this.ctx.success({
        id: this.jwt.get('id'),
        username: this.jwt.get('username'),
        info: this.jwt.get()
      }, '测试')
    }
  }

  async infoAction() {
    let result = this.jwt.get();
    if(result.errmsg) {
      this.ctx.fail(400, result.errmsg)
    } else {
      this.ctx.success({
        result,
      }, '测试')
    }
  }

  async logoutAction() {
    this.ctx.success({}, '退出登录')
  }

  signUser(result, successText = '登录成功', failText = '登录失败', takeToken = true) {
    if(!result) {
      return this.ctx.fail(400, failText);
    }
    if(result && result.type == 'exist') {
      return this.ctx.fail(400, failText);
    }

    if(result.id || result._id) {
      let data = { result };
      if(takeToken) {
        data.token = this.jwt.sign(result);
      }
      
      return this.ctx.success(data, successText)
    }

    return this.ctx.fail(400, failText);
  }

  checkUser() {
    var isAdmin = this.jwt.get('role') == 1;

    if(!isAdmin) {
      this.ctx.fail(401, '权限不足');
      return false;
    }

    return true;
  }

  async delAction() {
    if(!this.checkUser()) return;
    return this.delUser(false);
  }

  async delReallyAction() {
    if(!this.checkUser()) return;
    return this.delUser(true);
  }

  async delUser(isReally) {
    let result = await this.mymodel('user').del(this.$formData, isReally,);
    
    return result == 0 ? (
      this.ctx.fail(400, '删除失败')
    ) : (
      this.ctx.success({}, '删除成功')
    );
  }

  async handleFile(obj) {
    var $formData = { ...obj };

    // 处理文件
    let avatar = this.ctx.file('avatar');
    if(avatar && avatar.type.slice(0,5) === 'image') {
      const filepath = path.join(think.ROOT_PATH, `www/static/avatar/${$formData.id}${Date.now()}${path.extname(avatar.name)}`);
      think.mkdir(path.dirname(filepath));
      await rename(avatar.path, filepath)
      $formData.avatar = filepath.replace(path.join(think.ROOT_PATH, `www`), '');
    }

    return $formData;
  }
};

