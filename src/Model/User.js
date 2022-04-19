const { Model, Sequelize } = require("sequelize");

class User extends Model {
  static init(db) {
    super.init(
      {
        name: { type: Sequelize.TEXT },
        email: { type: Sequelize.TEXT },
        password: { type: Sequelize.TEXT },
        token: { type: Sequelize.TEXT },
        token_created_at: { type: Sequelize.DATE },
      },
      {
        sequelize: db,
        tableName: "users",
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Department, {
      foreignKey: "user_id",
      through: "user_departments",
      as: "departments",
    });
    this.belongsToMany(models.Level, {
      foreignKey: "user_id",
      through: "user_levels",
      as: "levels",
    });
  }
}

module.exports = { User };
