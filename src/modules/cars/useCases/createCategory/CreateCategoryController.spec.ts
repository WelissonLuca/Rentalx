import { app } from '@shared/infra/http/app';
import request from 'supertest';

describe('Create category controller', () => {
  it('should be albe to create a new category', async () => {
    const response = await request(app).post('/categories').send({
      name: 'Category supertest',
      description: 'Category supertest',
    });

    expect(response.status).toBe(201);
  });
});
