module.exports = (sequelize, Sequelize) => {
    const Note = sequelize.define("notes", {
      username: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      }
    });
    return Note;
  };