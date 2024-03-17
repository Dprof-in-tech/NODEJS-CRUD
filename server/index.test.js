const request = require('supertest');
const { app, closeServer } = require('./server');

describe('GET /api/users', () => {
  it('should retrieve a list of users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3); // Assuming we have 3 users initially
  });
});

describe('POST /api/users', () => {
  it('should create a new user', async () => {
    const newUser = {
      id: 4,
      name: 'New User',
      email: 'newuser@example.com'
    };
    const response = await request(app)
      .post('/api/users')
      .send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newUser);
  });
});

describe('GET /api/users/:id', () => {
  it('should retrieve a specific user by ID', async () => {
    const response = await request(app).get('/api/users/1');
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });

  it('should return 404 if user is not found', async () => {
    const response = await request(app).get('/api/users/999');
    expect(response.status).toBe(404);
  });
});

describe('PUT /api/users/:id', () => {
  it('should update an existing user by ID', async () => {
    const updatedUser = {
      name: 'Updated User',
      email: 'updated@example.com'
    };
    const response = await request(app)
      .put('/api/users/1')
      .send(updatedUser);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedUser);
  });

  it('should return 404 if user is not found', async () => {
    const response = await request(app)
      .put('/api/users/999')
      .send({ name: 'Updated User' });
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/users/:id', () => {
  it('should delete a user by ID', async () => {
    const response = await request(app).delete('/api/users/1');
    expect(response.status).toBe(204);
  });

  it('should return 404 if user is not found', async () => {
    const response = await request(app).delete('/api/users/999');
    expect(response.status).toBe(404);
  });
});


afterAll(() => {
  // Close the server to prevent Jest from hanging
  closeServer();
});
  