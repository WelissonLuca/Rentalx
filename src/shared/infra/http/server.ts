import { app } from './app';

console.log(process.env.NODE_ENV)
app.listen(3333, () => console.log('Server is running'));
