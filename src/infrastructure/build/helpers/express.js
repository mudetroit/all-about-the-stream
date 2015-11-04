import express from 'express';
import process from 'process';

const EXPRESS_ROOT = process.cwd();

const app = express();
app.use(express.static(EXPRESS_ROOT));

export default app;