import  express  from "express";
import { getGame, getGames, createGame, updateGame, deleteGame } from "../controllers/gameController.js";
const router = express.Router();

router.get("/", getGames);
router.get("/:id", getGame);
router.post("/", createGame);
router.patch("/:id", updateGame);
router.delete("/:id", deleteGame);

export const gameRouter = router;