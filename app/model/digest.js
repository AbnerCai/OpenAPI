
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const DigestSchema = new Schema({
        title: { type: String  },
        author: { type: String  },
        provenance: { type: String },
        readQuantity: { type: Number },
        createTime: { type: Date },
        updateTime: { type: Date }
    });

    return mongoose.model('Digest', DigestSchema);
};