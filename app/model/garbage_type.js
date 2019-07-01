
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GarbageTypeSchema = new Schema({
    name: { type: String  },
    createTime: { type: Date },
  });

  return mongoose.model('garbage_type', GarbageTypeSchema);
};