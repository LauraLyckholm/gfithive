// ------------ IMPORTS ------------ //
const express = require('express');
const router = express.Router();
const { ModelName } = require('../models/ModelName');
const listEndpoints = require("express-list-endpoints");

// ------------ SEEDING DATABSE ------------ //
// This is here to make sure that the database is reset every time the server is restarted. I have commented it out because I don't want to reset the database every time I restart the server but I want to be able to use it if I need to.
// if (process.env.RESET_DB) {
// const seedDatabase = async () => {
//     await ModelName.deleteMany({})

//     netflixData.forEach((netflixItem) => {
//         new ModelName(netflixItem).save()
//     });
// }
// seedDatabase()
// }

// Start defining your routes here
// app.get("/", (req, res) => {
//   res.send(listEndpoints(app));
// });

// app.get("/movies", (req, res) => {
//   ModelName.find()
//     .then(movies => {
//       if (movies.length > 0) {
//         res.json(movies);
//       } else {
//         res.status(404).json({ error: "No movies found" });
//       }
//     })
//     .catch(error => {
//       res.status(500).json({ error: "Something went wrong, please try again." });
//     });
// });

// Gets an individual movie based on its id. 
// app.get("/movies/:id", (req, res) => {
//   const movieID = parseInt(req.params.id); // Gets the id from the params
//   ModelName.findOne({ show_id: movieID }).then(movie => { // Checks if the id from the param is the same as the show_id, if it then it's displayed in json. Findone, because I only want one result.
//     if (movie) {
//       res.json(movie);
//     } else {
//       res.status(404).json({ error: `Movie with id ${movieID} not found. Having troubles finding the movie? Make sure you switch out ':id' for the id you wish to base your query on` });
//     }
//   })
//     .catch(error => {
//       res.status(500).json({ error: "Something went wrong, please try again." });
//     });
// });

// // Gets all movies with the release year searched for in the querystring. 
// app.get("/movies/year/:year", (req, res) => {
//   const releaseYear = parseInt(req.params.year); // Gets the id from the params
//   ModelName.find({ release_year: releaseYear }).then(year => { // Checks if the id from the param is the same as the show_id, if it then it's displayed in json
//     if (year.length > 0) {
//       res.json(year);
//     } else {
//       res.status(404).json({ error: `Movie with the release date ${releaseYear} wasn't found` });
//     }
//   })
//     .catch(error => {
//       res.status(500).json({ error: "Internal Server Error" });
//     });
// });

// // Makes it possible to query on a string included in the title
// app.get("/movies/title/:title", (req, res) => {
//   const titleQuery = req.params.title.toLowerCase();
//   ModelName.find({ title: { $regex: titleQuery, $options: "i" } }) // Query-filter. Search is performed on "title", titleQuery is the regex pattern searched for, options: "i" makes the search case-insensitive
//     .then(movies => {
//       if (movies) {
//         res.json(movies);
//       } else {
//         res.status(404).json({ error: `No movies found with the word '${titleQuery}' in the title` });
//       }
//     })
//     .catch(error => {
//       res.status(500).json({ error: "Internal Server Error" });
//     });
// });


// ------------ ROUTES ------------ //
router.get("/", (req, res) => {
    res.send(listEndpoints(router)); // Displays all available endpoints in json
});


// Exports the router
module.exports = router;