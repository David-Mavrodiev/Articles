/* globals $ Promise */
"use strict";

(function (scope) {
    scope.requester = {
        sendRequest: function sendRequest(method, url, body) {
            var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: url,
                    method: method,
                    data: body,
                    headers: headers,
                    success: function success(response) {
                        resolve(response);
                    },
                    error: function error(_error) {
                        reject(_error);
                    }
                });
            });
        },
        get: function get(url) {
            var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            headers["content-type"] = "application/json";
            return this.sendRequest("GET", url, null, headers);
        },
        post: function post(url, body) {
            var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            headers["content-type"] = "application/json";
            return this.sendRequest("POST", url, body, headers);
        },
        putJSON: function putJSON(url, body) {
            var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            headers["content-type"] = "application/json";
            return this.sendRequest("PUT", url, JSON.stringify(body), headers);
        },
        postJSON: function postJSON(url, body) {
            var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            headers["content-type"] = "application/json";
            return this.sendRequest("POST", url, JSON.stringify(body), headers);
        },
        getJSON: function getJSON(url) {
            var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            headers["content-type"] = "application/json";
            return this.sendRequest("GET", url, null, headers);
        }
    };
})(window);