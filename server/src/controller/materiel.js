const Base = require('./base.js');
var Mock = require('mockjs')

module.exports = class extends Base {
  getAllMaterielAction() {
    return this.ctx.json({
			code: 10000,
			data: Mock.mock({
				data: {
					"total|20-100": 1,
					"pages|1-10": 1,
					"data|10": [{
						"id|+1": 1,
						"type|1-3": 1,
						"name": "@cname",
						"path": "./static/css/qy.css",
						"size": "100MB",
						"createDate": 1534238847000
					}]
				}
			}).data,
			msg: "请求成功",
			status: true
		})
  }
};
