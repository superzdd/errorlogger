/**
 * errorlogger.js 日志记录
 * 提供网页异常自动记录日志的功能，适合在移动端页面调试使用
 */

(function () {
	window.errorlogger = {
		autoStore: true, // store log text automatically where invoke the log method
		storeKey: 'arr-error', // the key in localstorage
		start: function () {
			/** 错误内容
			 * date 记录日志的时间
			 * msg 错误内容
			 * url 错误url地址
			 * l   错误行
			 */
			function errorElement() {};
			errorElement.prototype.date = "";
			errorElement.prototype.msg = "";
			errorElement.prototype.url = "";
			errorElement.prototype.line = "";

			window.onerror = function (msg, url, l) {
				let self = errorlogger

				let ele = new errorElement()
				ele.date = self.formatDateString(new Date())
				ele.msg = msg
				ele.url = url
				ele.line = l

				let txt = "errorlogger catches a new error !!! " + JSON.stringify(ele)
				let log = self.log(txt)

				if (!self.autoStore) {
					self.saveLocal(log)
				}
			}

			console.log("errorlogger start working !!!")
		},
		saveLocal: function (logText) {
			let storeKey = this.storeKey
			if (!localStorage[storeKey]) {
				let arr = []
				arr.push(logText)

				localStorage[storeKey] = JSON.stringify(arr)
			} else {
				let arr = JSON.parse(localStorage[storeKey])
				arr.push(logText)
				localStorage[storeKey] = JSON.stringify(arr)
			}
		},
		showAll: function () {
			let storeKey = this.storeKey
			if (localStorage[storeKey] == null) {
				console.log("errorlogger : there is no error!!")
			} else {
				console.log(JSON.parse(localStorage[storeKey]))
			}
		},
		clearAll: function () {
			localStorage.removeItem(this.storeKey)
			console.log("errorlogger : clear error success!!")
		},
		formatDateString: function (date) {
			return date.toJSON().replace(/T/g, ' ').substring(0, 19)
		},
		log: function (txt) {
			let self = this
			let log = `[errorlogger] [${self.formatDateString(new Date())}]: ${txt}`
			console.log(log)
			if (self.autoStore) {
				self.saveLocal(log)
			}

			return log
		}
	}

	errorlogger.start()
})();