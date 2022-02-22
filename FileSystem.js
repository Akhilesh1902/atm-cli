const fs = require("fs");
const { resolve } = require("path/posix");

module.exports = class FileSystem {
  static read(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }

  static async write(path, content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, content.toString(), (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
};
