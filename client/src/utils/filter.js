import Vue from 'vue'
import { roles, sex } from './enum'

Vue.filter('sex', function(val) {
  return sex[val] || '未知';
})

Vue.filter('role', function(val) {
  return roles[val];
})

function leftPad(str) {
	return str >= 10 ? str : ('0' + str);
}

Vue.filter('datetime', function(value) {
  if (`${value}`.indexOf(':') > -1) {
    return value;
  }
  if ((value + '').length === 10) {
    value = value + '000';
  }
  var time = new Date(+value),
      year = time.getFullYear(),
      month = time.getMonth() + 1,
      date = time.getDate(),
      hour = time.getHours(),
      minute = time.getMinutes();
  return `${year}-${leftPad(month)}-${leftPad(date)} ${leftPad(hour)}:${leftPad(minute)}`; 
});

Vue.filter('tel', function(value) {
  return value.replace(/(\d{3})(\d{4})(\d{3})/g, function(str, $1, $2, $3) {
    return `${$1}****${$3}`
  });
});
