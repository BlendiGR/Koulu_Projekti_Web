import fs from 'fs';
import path from 'path';
import app from './app.js';

const envPath = path.resolve(process.cwd(), '.env');

if (!fs.existsSync(envPath)) {
  console.warn('.env file not found. Please create one based on .env.example');
  process.exit(1);
}

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});