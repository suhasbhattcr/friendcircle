import { Pool } from 'pg';

export const pool = new Pool({
  host: 'rosie.db.elephantsql.com',
  port: 5432,
  database: 'rsyzcvqi',
  user: 'rsyzcvqi',
  password: 'dAFKrc-sbMIu13EppobvbMfUGqpV4vN7',
  idleTimeoutMillis: 10000,
  max: 50,
});

