// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

const TABLE_NAME = ""; // ** PUT YOUR TABLE NAME HERE

var model = {
    all: function(cb) {
      orm.all(TABLE_NAME, function(res) {
        cb(res);
      });
    },
    create: function(cols, vals, cb) { // The variables cols and vals are arrays
      orm.create(TABLE_NAME, cols, vals, function(res) {
        cb(res);
      });
    },
    update: function(cols, condition, cb) {
      orm.update(TABLE_NAME, cols, condition, function(res) {
        cb(res);
      });
    },
    delete: function(condition, cb) {
      orm.delete(TABLE_NAME, condition, function(res) {
        cb(res);
      });
    }
  };

// Export the database functions for the controller.
module.exports = model;