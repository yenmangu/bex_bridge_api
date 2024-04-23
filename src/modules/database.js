import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import dotenv from 'dotenv';
dotenv.config({ path: path.join(path.resolve(__dirname, '..', '..'), '/.env') });
import Database from './databaseClass.js';

const database = new Database();
export default database;
