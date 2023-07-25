const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');
const Seat = require('../../../models/seat.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  before(async () => {
    const testConOne = new Concert({
      _id: '5d9f1140f10a81216cfd4408',
      id: 3,
      performer: 'Concert 1',
      genre: 'Pop',
      price: 40,
      day: 1,
      image: '/img/uploads/hdfh42sd213.jpg',
    });
    await testConOne.save();

    const testConTwo = new Concert({
      id: 1,
      performer: 'Concert 2',
      genre: 'Rock',
      price: 25,
      day: 2,
      image: '/img/uploads/1fsd324fsdg.jpg',
    });
    await testConTwo.save();

    const seatOne = new Seat({
      id: 1,
      day: 1,
      seat: 3,
      client: 'Amanda Doe',
      email: 'amandadoe@example.com',
    });
    await seatOne.save();
    const seatTwo = new Seat({
      id: 1,
      day: 2,
      seat: 3,
      client: 'Amanda Doe',
      email: 'amandadoe@example.com',
    });
    await seatTwo.save();
    const seatThree = new Seat({
      id: 1,
      day: 2,
      seat: 4,
      client: 'Amanda Doe',
      email: 'amandadoe@example.com',
    });
    await seatThree.save();
  });

  after(async () => {
    await Concert.deleteMany();
    await Seat.deleteMany();
  });

  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/:id should return one concertt by :id ', async () => {
    const res = await request(server).get(
      '/api/concerts/5d9f1140f10a81216cfd4408'
    );
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('/freeSeats data should be correct', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0].freeSeats).to.be.equal(49);
    expect(res.body[1].freeSeats).to.be.equal(48);
  });
});
