(function () {

    angular.module('MovieResource')
        .service('movieService', ['$resource', function ($resource) {
            var self = this;

            var Movie = $resource('/api/movies/:id');

            self.list = function () {
                return Movie.query();
            };

            self.add = function (movie, callback) {
                var newMovie = new Movie({
                    title: movie.title,
                    director: movie.director
                });
                newMovie.$save(callback);
            };

            self.update = function (movie) {
                movie.$save();
            };

            self.delete = function (movie, callback) {
                movie.$remove({ id: movie.id }, callback);
            };
        }]);

    angular.module('MovieResource')
        .controller('ResourceDemoController', function (movieService) {
            var vm = this;

            vm.movies = movieService.list();

            vm.add = function () {
                movieService.add(vm.newMovie, function (result) {
                    vm.movies.push(result);
                    $('#addForm')[0].reset();
                });
            };

            vm.update = function (movie) {
                movieService.update(movie);
            };

            vm.delete = function (movie) {
                movieService.delete(movie, function () {
                    vm.movies = vm.movies.filter(function (e) {
                        return e.id != movie.id;
                    });
                });
            };
        });
})();