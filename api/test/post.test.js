const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const mongoose = require('mongoose')
const expect = require('chai').expect;
const {
    Post
} = require('../models/post')


chai.use(chaiHttp);

describe("Posts", () => {
    let id;
    describe('/GET posts', () => {
        it('it should GET all the posts', (done) => {
            chai.request(server)
                .get('/posts')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an("array").to.not.equal(null);

                    done();
                });
        });
    });

    describe('/POST posts', () => {
        it('it should add new Post', (done) => {
            chai.request(server)
                .post('/posts')
                .send({
                    title: "Title",
                    text: "Lorem ipsum"
                })
                .end((err, res) => {

                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an("object");
                    expect(res.body).to.have.property('title');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('text');
                    expect(res.body).to.have.property('createTime');


                    expect(res.body).to.include({
                        'title': "Title",
                        'text': "Lorem ipsum"
                    });
                    id = res.body['_id']



                    done();
                });
        });
    });

    describe('/GET posts/:id', () => {
        it('it should GET specific post with given id', (done) => {
            chai.request(server)
                .get(`/posts/${id}`)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an("object").to.not.equal(null);

                    done();
                });
        });
    });

    describe('/PUT posts/:id', () => {
        it('it should UPDATE specific post with given id and new values', (done) => {
            chai.request(server)
                .put(`/posts/${id}`)
                .send({
                    "title": "New Title",
                    "text": "New Lorem Ipsum"
                })
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an("object").to.not.equal(null);
                    expect(res.body).to.have.property("updateTime")
                    done();
                });
        });
    });

    describe('/DELETE posts/:id', () => {
        it('it should DELETE specific post with given id', (done) => {
            chai.request(server)
                .delete(`/posts/${id}`)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an("object").to.not.equal(null);
                    done();
                });
        });
    });


})
