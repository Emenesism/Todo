import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from 'src/app.module';
import { UserRepository } from 'src/modules/users/repositories/user.repository'; // Adjust path as necessary

describe('AuthController (e2e) - Signup with Database', () => {
  let app: INestApplication;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());

    await app.init();

    userRepository = moduleFixture.get<UserRepository>(
      getRepositoryToken(UserRepository),
    );
  });

  afterAll(async () => {
    await userRepository.query(`DELETE FROM user;`);
    await app.close();
  });

  describe('/POST /auth/signup', () => {
    it('should successfully sign up a new user and store in DB', async () => {
      const signUpData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(signUpData)
        .expect(201);

      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.name).toBe('Test User');
      expect(response.body.data.email).toBe('test@example.com');

      const userInDb = await userRepository.findOne({
        where: { email: 'test@example.com' },
      });
      expect(userInDb).toBeDefined();
      expect(userInDb.name).toBe('Test User');
    });

    it('should return 400 when validation fails', async () => {
      const invalidSignUpData = {
        name: '',
        email: 'invalid-email',
        password: '123',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(invalidSignUpData)
        .expect(400);

      console.log(response);

      expect(response.body.message).toEqual([
        'Name can not be empty',
        'email must be an email',
        'password must be longer than or equal to 6 characters',
      ]);
    });
  });
});
