import Sequelize from "sequelize";
import User from "../app/models/User";
import File from "../app/models/File";
import mongoose from "mongoose";

import databaseConfig from "../config/database";
import Agendamento from "../app/models/Agendamento";

const models = [User, File, Agendamento];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
  mongo() {
    this.mongoConnection = mongoose.connect("mongodb://localhost:27017/app", {
      useNewUrlParser: true,
      useFindAndModify: true,
    });
  }
}

export default new Database();
