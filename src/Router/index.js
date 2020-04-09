const student = require('./students');

module.exports = (app) => {
    app.use('', student);
}