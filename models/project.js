module.exports = function(sequelize, DataTypes) {
  let Project = sequelize.define("Project", {
    name: {
      type: DataTypes.STRING,
      notNull: true,
      notEmpty: true,
      validation: {
        len: [2, 32]
      }
    },
    desc: {
      type: DataTypes.TEXT,
      notNull: true,
      validation: {
        len: [0, 250]
      }
    },
    img: {
      type: DataTypes.STRING,
      notNull: true
    },
    owner: {
      type: DataTypes.INTEGER,
      notNull: true,
      isInt: true
    }
  });

  // TODO: associations

  return Project;
};
