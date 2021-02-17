// // First, sign up for an account at https://themoviedb.org
// // Once verified and signed-in, go to Settings and create a new
// // API key; in the form, indicate that you'll be using this API
// // key for educational or personal use, and you should receive
// // your new key right away.
// //API KEY: db3d694f164aefeeaecbe1ceaa2f38bb

// // For this exercise, we'll be using the "now playing" API endpoint
// // https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US

// // Note: image data returned by the API will only give you the filename;
// // prepend with `https://image.tmdb.org/t/p/w500/` to get the 
// // complete image URL

// //(These are high-level requirements for grading; more detailed mechanics are included in the comments of movies.js.)
// //Create a new brand-new repository in your GitHub account called hw6. Clone and open the code in VSCode. Add an HTML page and corresponding JS file – you can use the provided movies.html and movies.js as a starting point.

window.addEventListener('DOMContentLoaded', async function(event) {

    // Step 1: Construct a URL to get movies playing now from TMDB, fetch
    // data and put the Array of movie Objects in a variable called
    // movies. Write the contents of this array to the JavaScript
    // console to ensure you've got good data
    // ⬇️ ⬇️ ⬇️
  event.preventDefault()
  let response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=db3d694f164aefeeaecbe1ceaa2f38bb&language=en-US`)
  console.log(response)
  let json = await response.json()
  let movies = json.results
  console.log(movies)



  let db = firebase.firestore()
  let watchedSnapshot = await db.collection('watched').get()
    let watchedMovies = watchedSnapshot.docs
  // console.log(hw6Snapshot)


//   //let movies = await response.movies
//   //console.log(movies)
  
//   // ⬆️ ⬆️ ⬆️ 
//     // End Step 1
    
//     // Step 2: 
//     // - Loop through the Array called movies and insert HTML
//     //   into the existing DOM element with the class name .movies
//     // - Include a "watched" button to click for each movie
//     // - Give each "movie" a unique class name based on its numeric
//     //   ID field.
//     // Some HTML that would look pretty good... replace with real values :)
//     // <div class="w-1/5 p-4 movie-abcdefg1234567">
//     //   <img src="https://image.tmdb.org/t/p/w500/moviePosterPath.jpg" class="w-full">
//     //   <a href="#" class="watched-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">I've watched this!</a>
//     // </div>
//     // ⬇️ ⬇️ ⬇️
  for (let i=0; i<movies.length; i++) {
    let movie = movies[i]
    let movieId = movie.id
    let dbMovie = await db.collection('watched').doc(`${movieId}`).get()
    let dbData = dbMovie.data()
    console.log(dbData)
    let moviePoster = movie.poster_path
    let movieDomElement = document.querySelector(`.movies`)
  
    movieDomElement.insertAdjacentHTML(`beforeend`, `
    <div class="movie-${movieId} w-1/5 p-4">
      <img src="https://image.tmdb.org/t/p/w500${moviePoster}" class="w-full">
      <a href="#" class="watched-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">Watched</a>
    </div>
    `)

    if(dbData){
        let movieViewed = document.querySelector(`.movie-${movieId}`)
        movieViewed.classList.add('opacity-20')
    }

//      ⬆️ ⬆️ ⬆️ 
//     // End Step 2

//     // Step 3: 
//     // - Attach an event listener to each "watched button"
//     // - Be sure to prevent the default behavior of the button
//     // - When the "watched button" is clicked, changed the opacity
//     //   of the entire "movie" by using .classList.add('opacity-20')
//     // - When done, refresh the page... does the opacity stick?
//     // - Bonus challenge: add code to "un-watch" the movie by
//     //   using .classList.contains('opacity-20') to check if 
//     //   the movie is watched. Use .classList.remove('opacity-20')
//     //   to remove the class if the element already contains it.
//     // ⬇️ ⬇️ ⬇️
    let watchedButton = document.querySelector(`.movie-${movieId}`)
    console.log(watchedButton)
    watchedButton.addEventListener(`click`, async function(event){
      event.preventDefault()
      let movieViewed = document.querySelector(`.movie-${movieId}`)
      movieViewed.classList.add('opacity-20')
      await db.collection(`watched`).doc(`${movieId}`).set({})
    })

    
//       //console.log(`Movie ${movieId} was watched.`)
}
})
  
//     })



//   }
 
//     // ⬆️ ⬆️ ⬆️ 
//     // End Step 3
  
//     // Step 4: 
//     // - Properly configure Firebase and Firebase Cloud Firestore
//     // - Inside your "watched button" event listener, you wrote in
//     //   step 3, after successfully setting opacity, persist data
//     //   for movies watched to Firebase.
//     // - The data could be stored in a variety of ways, but the 
//     //   easiest approach would be to use the TMDB movie ID as the
//     //   document ID in a "watched" Firestore collection.
//     // - Hint: you can use .set({}) to create a document with
//     //   no data – in this case, the document doesn't need any data;
//     //   if a TMDB movie ID is in the "watched" collection, the 
//     //   movie has been watched, otherwise it hasn't.
//     // - Modify the code you wrote in Step 2 to conditionally
//     //   make the movie opaque if it's already watched in the 
//     //   database.
//     // - Hint: you can use if (document) with no comparison
//     //   operator to test for the existence of an object.

