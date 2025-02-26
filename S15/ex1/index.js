import { Transform } from './stream.js';

const file = "users.csv";

const transform = new Transform(file);

transform.start();