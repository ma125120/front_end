const dbType = think.config("dbType").replace(/^(\w)/g, (str, first) => first.toUpperCase());

module.exports = class extends think[dbType] {
  constructor(...arg) {
    
    super(...arg);

    var self = this;

    this.getId = dbType == 'model' ? 'id' : '_id';
    
    this.beforeMethods && (this.beforeMethods.map(v => {

      if(!this[v]) return;
      let _method = this[v];

      this[v] = (...args) => {
        let obj = this._before(args[0]),
            option = { flag: 1 };
            
        return _method.apply(self, [ obj, ...args.slice(1), option ])
      }
    }));

    this.afterMethods && (this.afterMethods.map(v => {
      if(!this[v]) return;
      let _method = this[v];
      this[v] = async (...args) => {
        let obj = await _method.apply(this, [ ...args ]);
        return this._after(obj);
      }
    }));
  }

  _before() {
    throw new Error('必须先在类内实现_before方法')
  }

  _after() {
    throw new Error('必须先在类内实现_after方法')
  }

  getTime(time) {
    return new Date(time).getTime();
  }
};
