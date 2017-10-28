/* globals $ Promise */
"use strict";

((scope) => {
    scope.requester = {
        sendRequest(method, url, body, headers = {}) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url,
                    method,
                    data: body,
                    headers,
                    success(response) {
                        resolve(response);
                    },
                    error(error) {
                        reject(error);
                    }
                });
            });
        },
        get(url, headers = {}) {
            headers["content-type"] = "application/json";
            return this.sendRequest("GET", url, null, headers);
        },
        post(url, body, headers = {}) {
            headers["content-type"] = "application/json";
            return this.sendRequest("POST", url, body, headers);
        },
        putJSON(url, body, headers = {}) {
            headers["content-type"] = "application/json";
            return this.sendRequest("PUT", url, JSON.stringify(body), headers);
        },
        postJSON(url, body, headers = {}) {
            headers["content-type"] = "application/json";
            return this.sendRequest("POST", url, JSON.stringify(body), headers);
        },
        getJSON(url, headers = {}) {
            headers["content-type"] = "application/json";
            return this.sendRequest("GET", url, null, headers);
        }
    }
})(window);