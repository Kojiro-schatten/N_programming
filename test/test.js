'use strict'

const request = require('supertest');
const app = require('../app');

// ログインアクセス時、レスポンスヘッダのContent-Typeがtext/html; charset=utf-8であること
// href="/auth/github"がHTMLに含まれている
// 200　OKで返す

describe('/login', () => {
    it('ログインのためのリンクが含まれる', (done) => {
        request(app)
            .get('/login')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(/<a href="\/auth\/github"/)
            .expect(200, done);
    });
});