import express, { request, response } from 'express';
const app = express();

app.listen(3333, () => console.log('Server is running'));
app.get('/', (request, response) => {
  return response.json({ message: 'Hello world'})
});

app.post('/courses', (request, response) => {
  const { name } = request.body;

  return response.json({ name })
})
