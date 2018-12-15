export function checkAge(rule, value, callback) {
  var val = +value;
  if (!val) {
    return callback(new Error('年龄不能为空'));
  }
  if (!Number.isInteger(val)) {
    callback(new Error('请输入数字值'));
  } else {
    if (val < 18) {
      callback(new Error('必须年满18岁'));
    } else {
      callback();
    }
  }
}
