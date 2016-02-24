(function () {
    angular.module('MovieResource')
        .service('loginService', ['$http', function ($http) {
            var self = this;

            self.login = function (username, password, callback) {
                var data = 'grant_type=password&username=' + username + '&password=' + password;
                
                $http.post('/token', data, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).success(function (result) {
                    $http.defaults.headers.common.Authorization = 'Bearer ' + result.access_token;
                    callback();
                });
            };
        }]);
})();
