var DataTypes = require("sequelize").DataTypes;
var _franmejias = require("./franmejias");

function initModels(sequelize) {
  var franmejias = _franmejias(sequelize, DataTypes);


  return {
    franmejias,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
