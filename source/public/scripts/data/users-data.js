/* globals  */

const requester = window.requester;

((scope) => {

    scope.usersdata = {
        getUserByUsername(username){
            return requester.getJSON("/api/users/" + username);
        },
        login(user) {
            return requester.putJSON("/api/users/login", user);
        },
        register(user) {
            return requester.postJSON("/api/users/register", user);
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