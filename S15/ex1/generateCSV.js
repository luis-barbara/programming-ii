const fs = require('fs');
const { faker } = require('@faker-js/faker');  // Alterado para @faker-js/faker

// Função para gerar o CSV
function generateCSV(filePath, targetSizeMB) {
    const targetSizeBytes = targetSizeMB * 1024 * 1024; // Converte de MB para bytes
    const fileStream = fs.createWriteStream(filePath);

    // Escrever cabeçalho
    fileStream.write('login,name,email,data,city,random\n');

    let currentSize = 0;
    let count = 0;

    // Gerar dados até atingir o tamanho alvo
    while (currentSize < targetSizeBytes) {
        const login = faker.internet.username();  // Alterado para username()
        const name = faker.person.fullName();     // Alterado para fullName()
        const email = faker.internet.email();
        const data = faker.date.past().toISOString();
        const city = faker.location.city();       // Alterado para location.city()
        const random = faker.string.uuid();       // Alterado para string.uuid()

        // Montar a linha do CSV
        const line = `${login},${name},${email},${data},${city},${random}\n`;

        fileStream.write(line);

        // Atualizar o tamanho atual
        currentSize += Buffer.byteLength(line, 'utf8');
        count++;

        if (count % 10000 === 0) {
            console.log(`Generated ${count} users...`);
        }
    }

    // Fechar o stream
    fileStream.end();
    console.log(`CSV file generated at ${filePath}`);
}

// Gerar o arquivo CSV com cerca de 300 MB
const filePath = 'users.csv';
generateCSV(filePath, 300);
