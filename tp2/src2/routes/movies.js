const express = require("express");
const router = express.Router();
const {insertOneMovies, insertOneItem, updatestatus, findWatchlist, findWatchFilm, findItemRegistre, deleteWatchList, deleteOneFilm, watchlistFavori, partageWatchList, ajoutDescr} = require("../controllers/movies");

// 2 //
router.post("/insertMovie", insertOneMovies);
// 4 //
router.post("/insertItem", insertOneItem);
// 5 //
router.post("/updateStatus", updatestatus);
// 6 //
router.get("/findItemRegistre", findItemRegistre);
// 8 //
router.get("/findWatch", findWatchlist);
// 9 //
router.get("/findFilm", findWatchFilm);
// 10 //
router.post("/deleteItem", deleteOneFilm);
// 12 //
router.post("/deleteWatchList", deleteWatchList);
// 13 //
router.post("/addFavori", watchlistFavori);
// 14 //
router.post("/partageWatch", partageWatchList);
// 15 //
router.post("/addDescription", ajoutDescr)

module.exports = router;