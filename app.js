const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const reviews = require('./routes/review');
const campgrounds = require('./routes/campgrounds');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');

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

//미들웨어
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// 라우터
app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews);

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