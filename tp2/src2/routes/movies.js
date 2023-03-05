const express = require("express");
const router = express.Router();
const {insertOneMovies, insertOneItem, updatestatus, findWatchlist, findWatchFilm, findItemRegistre, deleteWatchList, deleteOneFilm, watchlistFavori, partageWatchList, ajoutDescr} = require("../controllers/movies");

// 2 //
router.post("/insertMovie", insertOneMovies);
// 4 //
router.post("/insertItem", insertOneItem);
// 5 //
router.post("/updateStatus", updatestatus);
// 8 //
router.get("/findWatch", findWatchlist);
router.get("/findFilm", findWatchFilm);
// 6 //
router.get("/findItemRegistre", findItemRegistre);
router.post("/deleteWatchList", deleteWatchList);
router.post("/deleteItem", deleteOneFilm);
router.post("/addFavori", watchlistFavori);
router.post("/partageWatch", partageWatchList);
router.post("/addDescription", ajoutDescr)

module.exports = router;