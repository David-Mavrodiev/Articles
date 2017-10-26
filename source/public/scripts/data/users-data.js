/* globals  */

const requester = window.requester;

((scope) => {

    scope.usersdata = {
        login(user) {
            return requester.putJSON(window.path + "/api/account/login", user);
        },
        register(user) {
            return requester.postJSON(window.path + "/api/account/register", user);
        },
        logout() {
            return Promise.resolve()
                .then(() => {
                    localStorage.removeItem("username");
                });
        },
        isLoggedIn() {
            return Promise.resolve()
                .then(() => {
                    let username = localStorage.getItem("username");
                    return username;
                });
        }
    }

})(window)