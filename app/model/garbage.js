
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GarbageSchema = new Schema({
    name: { type: String  },
    queryQuantity: { type: Number },
    createTime: { type: Date },
    updateTime: { type: Date },
    isDelete: { type: Boolean },
    garbageType: {type: Schema.Types.ObjectId}
  });

  return mongoose.model('garbage', GarbageSchema);
};