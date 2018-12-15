var BaseModel = require('./base.js');

module.exports = class extends BaseModel {
  // get schema() {
  //   return {
  //     // id: { // 字段名称
  //     //   type: 'int(11)',
  //     //   primary: true,
  //     //   autoIncrement: true,
  //     // },
  //     // createTime: {
  //     //   type: 'timestamp',
  //     // },
  //     // updateTime: {
  //     //   type: 'timestamp',
  //     // },
  //     // age: {
  //     //   type: 'int',
  //     //   default: 10,
  //     // },
  //     // sex: {
  //     //   type: 'int',
  //     //   default: 0
  //     // }
  //   }
  // }

  get beforeMethods() {
    return ['getList', 'addUser', 'login', 'editPwd', 'register', 'addUser' ];
  }
  get afterMethods() {
    return ['getList', 'login', 'editPwd' ];
  }

  get hidden() {
    return [ 'pwd' ];
  }

  async getList(obj, option) {
    let options = 1,
        page = obj.page || 1,
        pagesize = obj.pagesize || 3;

    // 根据时间查询
    if(obj.startTime && obj.endTime) {
      let startTime = think.datetime(+obj.startTime),
          endTime = think.datetime(+obj.endTime);
      options = { createTime: ['BETWEEN', `${ startTime },${ endTime }`] };
    }

    var result = await this.where(option).where(options).page(page, pagesize).countSelect({}, true);
    result.data = result.data.map(v => this.formatObj(v));
    return result;
  }

  async exist(obj, option) {
    var result = await this.where({ username: obj.username }).find(),
        flag = false;
    if(result && result.id) {
      flag = result.flag !== 0;
    }
    // false 不存在  true 已经存在
    return flag;
  }

  async login(obj, option) {

    let lists = await this.where(option).where({ username: obj.username, pwd: obj.pwd }).find();

    return lists;
  }

  async editPwd(obj, id, option) {
    let affectedRows  = await this.where(option).where({ id: obj.id, pwd: obj.pwd }).update({ pwd: think.md5(obj.newPwd) });

    let result = '';

    if(affectedRows > 0) {
      result = await this.where({ id }).find();
    }
    return result;
  }

  async edit(obj, option) {
    let affectedRows  = await this.where(option).where({ id: obj.id }).update(think.omit(obj, 'id,createTime,updateTime'));

    let result = '';

    if(affectedRows > 0) {
      result = await this.where({ id: obj.id }).find();
    }
    return result;
  }

  async addUser(obj, option) {
    let info = await this.where({ username: obj.username }).find(),
        result = { type: 'exist' };
    if(info && info.id) {
      if(info.flag === 0) {
        let affectedRows  = await this.where({ username: obj.username }).update({ flag: 1 });console.log(`row: ${affectedRows}`)
        result = { type: affectedRows > 0 ? 'add' : 'exist', id: info.id };
      }
    } else {
      result  = await this.where({ username: obj.username }).thenAdd(obj).catch(err => { console.log(err) });
    }

    return result;
  }

  async register(obj, option) {
    
    let result  = await this.where(option).where({ username: obj.username, }).thenAdd(obj);

    if(result && result.type == 'add') {
      result = await this.where({ id: result.id }).find();
      result.type = 'add';
    }

    return result;
  }

  async del(obj, isReally = false, option) {
    let affectedRows;
    if(isReally) {
      affectedRows = await this.where({ id: obj.id }).delete();
    } else {
      affectedRows = await this.where({ id: obj.id }).update({ flag: 0 });
    }

    return affectedRows;
  }

  test() {
    return this;
  }

  _before(obj) {
    if(!obj) return obj;
    obj.pwd = think.md5(obj.pwd);
    obj.role = 2;
    obj.flag = obj.flag || 1;

    return obj;
  }

  _after(obj) {
    if(!obj) return obj;
    obj = this.formatObj(obj);

    return obj;
  }

  formatObj(obj) {
    this.hidden && (this.hidden.map(key => {
      obj[key] && (delete obj[key]);
    }));

    if(obj.createTime) {
      obj.createTime = this.getTime(obj.createTime);
    }
    if(obj.updateTime) {
      obj.updateTime = this.getTime(obj.updateTime);
    }

    return obj;
  }
}