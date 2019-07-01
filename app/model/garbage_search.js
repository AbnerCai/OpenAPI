
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GarbageSearchSchema = new Schema({
    name: { type: String  },
    createTime: { type: Date },
  });

  return mongoose.model('garbage_search', GarbageSearchSchema);
};