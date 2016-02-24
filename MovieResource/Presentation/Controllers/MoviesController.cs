using AutoMapper;
using CoderCamps.Data.Repository;
using MovieResource.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MovieResource.Presentation.Controllers {
    public class MoviesController : ApiController {

        private IRepository _repo;

        public MoviesController(IRepository repo) {
            _repo = repo;
        }

        public IList<Movie> Get() {
            return _repo.Query<Movie>().ToList();
        }

        public Movie Get(int id) {
            return _repo.Find<Movie>(id);
        }

        public HttpResponseMessage Post(Movie movie) {
            if (ModelState.IsValid) {
                if (movie.Id > 0) {
                    var dbMovie = _repo.Find<Movie>(movie.Id);
                    dbMovie.Title = movie.Title;
                    dbMovie.Director = movie.Director;
                    movie = dbMovie;
                }
                else {
                    _repo.Add(movie);
                }
                _repo.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, movie);
            }
            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, this.ModelState);
        }

        public void Delete(int id) {
            _repo.Delete<Movie>(id);
            _repo.SaveChanges();
        }
    }
}
