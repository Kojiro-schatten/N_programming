'use strict'

const request = require('supertest');
const app = require('../app');
const passportStub = require('passport-stub');

// ログインアクセス時、レスポンスヘッダのContent-Typeがtext/html; charset=utf-8であること
// href="/auth/github"がHTMLに含まれている
// 200　OKで返す

describe('/login', () => {
    // before関数は、テスト前にしたいことをかく
    before(() => {
        passportStub.install(app);
        passportStub.login({ username: 'testuser'});
    });

    // after関数は、テスト後にしたいことをかく
    after(() => {
        passportStub.logout();
        passportStub.uninstall(app);
    });

    it('ログインのためのリンクが含まれる', (done) => {
        // request(app).get('/login)で/loginへのGETリクエスト作成
        request(app)
            .get('/login')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(/<a href="\/auth\/github"/)
            .expect(200, done);
    });

    it('ログイン時はユーザー名が表示', (done) => {
        request(app)
            .get('/login')
            .expect(/testuser/)
            .expect(200, done);
    });
});

// describe('/logout', () => {
//     it('/にリダイレクト', (done) => {
//         request(app)
//             .get('/logout')
//             .expect("Location", '/')
//             .expect(302, done);
//     });
// });
