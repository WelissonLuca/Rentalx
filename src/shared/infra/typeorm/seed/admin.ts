import { v4 as uuid } from 'uuid';
import { hash } from 'bcrypt';

import { connection } from '../index';

async function create() {
  const db = await connection();

  const id = uuid();
  const password = await hash('admin', 8);

  await db.query(`
    INSERT INTO users (id, name, email, password, "isAdmin", created_at, driver_license)
    VALUES ( '${id}', 'Admin', 'admin@rentx.com.br', '${password}', true, NOW(), 'XXXXX' )
  `);

  await db.close();
}

create().then(() => console.log('created'));
