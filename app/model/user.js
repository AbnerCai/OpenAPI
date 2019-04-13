
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        email: { type: String  },
        password: { type: String  },
        salt: { type: String },
        token: { type: String },
        registerTime: { type: Date }
    });

    return mongoose.model('User', UserSchema);
};