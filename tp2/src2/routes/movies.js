const express = require("express");
const router = express.Router();
const {insertOneMovies, insertOneItem, updatestatus, findWatchlist, findWatchFilm, findItemRegistre, deleteWatchList, deleteOneFilm, watchlistFavori, partageWatchList, ajoutDescr} = require("../controllers/movies");

router.post("/insertMovie", insertOneMovies);
router.post("/insertItem", insertOneItem);
router.post("/updateStatus", updatestatus);
router.get("/findWatch", findWatchlist);
router.get("/findFilm", findWatchFilm);
router.get("/findItemRegistre", findItemRegistre);
router.post("/deleteWatchList", deleteWatchList);
router.post("/deleteItem", deleteOneFilm);
router.post("/addFavori", watchlistFavori);
router.post("/partageWatch", partageWatchList);
router.post("/addDescription", ajoutDescr)

module.exports = router;