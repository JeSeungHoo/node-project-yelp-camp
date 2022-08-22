if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();

const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');

const mongoose = require('mongoose');

const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const ExpressError = require('./utils/ExpressError');

const User = require('./models/user');

const userRoutes = require('./routes/users');
const reviewRoutes = require('./routes/review');
const campgroundRoutes = require('./routes/campgrounds');


// db 연결
mongoose.connect('mongodb://localhost:27017/yelp-camp');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Database connected');
});

// 뷰 엔진 설정
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// req.body를 받아오기 위해 필요한 설정
app.use(express.urlencoded({ extended: true }));
// 메소드 오버라이드 변수
app.use(methodOverride('_method'));
// 정적 assets
app.use(express.static(path.join(__dirname, 'public')));

// 세션, 플래시
const sessionConfig = {
    secret: 'ThisIsSecretCode',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};
app.use(session(sessionConfig));
app.use(flash());

// 인증
app.use(passport.initialize());
app.use(passport.session()); // 세션 이후에 passport.session 설정
passport.use(new LocalStrategy(User.authenticate()));
// 직렬화-역직렬화
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//미들웨어
app.use((req, res, next) => {
    // 로그인 유저
    res.locals.currentUser = req.user; // passport에서 req.user 자동 추가
    // 플래시
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// 라우터
app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);

app.get('/fakeUser', async (req, res) => {
    const user = new User({ email: 'abcdef@gmail.com', username: 'fake' });
    const newUser = await User.register(user, 'password');
    res.send(newUser);
});

app.get('/', (req, res) => {
    res.render('home');
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!';
    res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
    console.log('Serving on port 3000!');
});