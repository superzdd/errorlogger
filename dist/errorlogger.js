/**
 * errorlogger.js 日志记录
 * 提供网页异常自动记录日志的功能，尤其适合在移动端页面调试使用
 */

(function() {
	window.errorlogger = {
		start: function() {
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
			errorElement.prototype.l = "";

			window.onerror = function(msg, url, l) {
				var arrname = "arr-error";

				var ele = new errorElement();
				ele.date = new Date();
				ele.msg = msg;
				ele.url = url;
				ele.l = l;

				if(!localStorage[arrname]) {
					var arr = [];
					arr.push(ele);

					localStorage[arrname] = JSON.stringify(arr);
				} else {
					var arrp = JSON.parse(localStorage[arrname]);
					arrp.push(ele);
					localStorage[arrname] = JSON.stringify(arrp);
				}

				console.log("errorlogger catches a new log !!! " + JSON.stringify(ele));
			}

			console.log("errorlogger start working !!!");
		},
		outputErrors: function() {
			if(localStorage["arr-error"] == null) {
				console.log("errorlogger : there is no error!!");
			} else {
				console.log(JSON.parse(localStorage["arr-error"]));
			}
		},
		clearErrorLogs: function() {
			localStorage.removeItem("arr-error");
			console.log("errorlogger : clear error success!!");
		}
	}

	errorlogger.start();
})();
