// jquery code

$(document).ready(()=>{
    // add event when the form is submitted
    $('#searchForm').on('submit',(e) => {
    let movieSearch = $('#movieSearch').val();
    // function
    getMovies(movieSearch);
    e.preventDefault();
    });
});

//function

function getMovies(movieSearch){
    // api code here
    // ? - adds a paramert, s= to search // purchased api key from brain fritz patreaon
    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=31e2fb11&s='+movieSearch) // this is gonna return promise
    .then((response)=>{
        console.log(response);
        let movies = response.data.Search; // this gonna put the search array into movies variable.
        let output = '';
        // each loop to iterate through each movie  that we have got after api request
        $.each(movies, (index, movie)=>{
            // `` includes template string
            output += `
            <div class="col-md-3">
                <div class="well text-center">
                    <img src="${movie.Poster}">
                    <h5>${movie.Title}</h5>
                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">More Info</a>
                </div>
            </div>
            `;
        });

        // passing the output to the #movies ID div
        $('#movies').html(output);


    })
    .catch((err)=>{
        console.log(err);
    });

}

// single movie selected function

function movieSelected(id){
// use session storage here
    sessionStorage.setItem('movieId',id);
    window.location = 'movie.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    axios.get('http://www.omdbapi.com?i='+movieId+'&apikey=31e2fb11') // this is gonna return promise
    .then((response) => {
        console.log(response);
        let movie = response.data;
        let output = `
        <div class="row">
            <div class="col-md-4">
                <img src="${movie.Poster}" class="thumbnail">
            </div>
            <div class="col-md-8">
                 <h2>${movie.Title}</h2>
                 <ul class="list-group">
                    <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                    <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                    <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                    <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                    <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                    <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                 </ul>
            </div>
        </div> <!-- .row-->

        <div class="row">
            <div class="well">
                <h3>Plot</h3>
                ${movie.Plot}
                <hr>
                <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                <a href="index.html" class="btn btn-success">Go Back To Search</a>
            </div>
        </div>
        `;
        $('#movie').html(output);


    })
    .catch((err)=>{
        console.log(err);
    });

}