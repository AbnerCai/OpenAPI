
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const DigestSchema = new Schema({
        title: { type: String  },
        author: { type: String  },
        content: { type: String  },
        provenance: { type: String },
        readQuantity: { type: Number },
        createTime: { type: Date },
        updateTime: { type: Date },
        user_id: {type: Schema.Types.ObjectId}
    });

    return mongoose.model('Digest', DigestSchema);
};