var mongoose = require("mongoose");

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Posts", {
    useNewUrlParser: true
});
module.exports = {
    mongoose
}
