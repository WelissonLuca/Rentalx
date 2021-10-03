import request from 'supertest';
import { Connection } from 'typeorm';
import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { app } from '@shared/infra/http/app';

import { connection } from '@shared/infra/typeorm';

let db: Connection;
describe('Create category controller', () => {
  beforeAll(async () => {
    db = await connection();

    console.log(process.env.NODE_ENV);
    await db.runMigrations();

    const id = uuid();
    const password = await hash('admin', 8);

    await db.query(`
    INSERT INTO users (id, name, email, password, "isAdmin", created_at, driver_license)
    VALUES ( '${id}', 'Admin', 'admin@rentx.com.br', '${password}', true, NOW(), 'XXXXX' )
  `);
  });
  it('should be albe to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category supertest',
        description: 'Category supertest',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
  });

  afterAll(async () => {
    await db.query(
      'DROP TABLE rentals; DROP TABLE cars_image; DROP TABLE specifications_cars; DROP TABLE cars; DROP TABLE users; DROP TABLE specifications; DROP TABLE categories; DROP TABLE migrations;'
    );
    await db.close();
  });
});
