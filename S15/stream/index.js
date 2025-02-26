import { Transform } from './stream.js';

const file = "LunarLander-v2.csv";

const transform = new Transform(file);

transform.start();