const { authJwt } = require("../middleware");
const controller = require("../controllers/note.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/data/notes",[authJwt.verifyToken],controller.getNotes);
  app.post("/api/data/notes",[authJwt.verifyToken],controller.createNote);
  app.get("/api/data/note",[authJwt.verifyToken],controller.getNote);
  app.put("/api/data/note",[authJwt.verifyToken],controller.modifyNote);
  app.delete("/api/data/note",[authJwt.verifyToken],controller.deleteNote);
};