import request from 'supertest';
import { Connection } from 'typeorm';
import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { app } from '@shared/infra/http/app';

import { connection } from '@shared/infra/typeorm';

let db: Connection;
describe('list categories', () => {
  beforeAll(async () => {
    db = await connection();

    await db.runMigrations();

    const id = uuid();
    const password = await hash('admin', 8);

    await db.query(`
    INSERT INTO users (id, name, email, password, "isAdmin", created_at, driver_license)
    VALUES ( '${id}', 'Admin', 'admin@rentx.com.br', '${password}', true, NOW(), 'XXXXX' )
  `);
  });
  it('should return a list of categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { token } = responseToken.body;

    await request(app)
      .post('/categories')
      .send({
        name: 'Category supertest',
        description: 'Category supertest',
      })
      .set('Authorization', `Bearer ${token}`);

    await request(app)
      .post('/categories')
      .send({
        name: 'Category2 supertest',
        description: 'Category2 supertest',
      })
      .set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .get('/categories')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0].name).toEqual('Category supertest');
  });

  afterAll(async () => {
    await db.query(
      'DROP TABLE rentals; DROP TABLE cars_image; DROP TABLE specifications_cars; DROP TABLE cars; DROP TABLE users; DROP TABLE specifications; DROP TABLE categories; DROP TABLE migrations;'
    );
    await db.close();
  });
});
