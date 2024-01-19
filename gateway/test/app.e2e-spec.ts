import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true });
    //await mongoose.connection.dropDatabase();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close()
  })

  it('Test - Get User',()=>{
    return request(app.getHttpServer())
      .get('/user')
      .expect(200);
  })

  it.skip('Test - Create user and verfiy login sucessful', () => {
    const userDetails = {
      name: "Tester1",
      email: "1@2",
      password: "password",
      createdOn: Date.now(),
      active: true
    }
    // Create User
    request(app.getHttpServer())
      .post('/user')
      .send(userDetails)
      .expect(201);

    return request(app.getHttpServer())
      .post('/login')
      .send({
        email: userDetails.email,
        password: userDetails.password
      })
      .expect(200);

  });

});
