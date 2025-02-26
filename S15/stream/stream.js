// stream.js
import { createReadStream } from 'fs';  
const stream = createReadStream('LunarLander-v2.csv', 'utf-8');  
stream.on('data', chunk => console.log('Chunk:', chunk.length));  



export class Transform{
    #filePath;
    constructor(filePath){
        this.#filePath = filePath;
    }

    start(){
        const stream = createReadStream(this.#filePath, "utf-8");  //(this.#filePath{encoding:"utf-8", highWaterMark: 100}); - separa os ficheiros em diferentes com 100 caracteres/bytes
        stream.on('data', chunk => console.log(`Chunk: ${chunk.length}`));  
    }
};

