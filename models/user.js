const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// 사용자 이름과 암호 필드 추가 및 메소드 생성
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);