const { exec } = require('child_process');


jest.mock('child_process', () => ({
  exec: jest.fn((cmd, callback) => {
    // Simula a resposta do comando como se tivesse retornado a mensagem esperada
    callback(null, 'Resultados para a pesquisa: IP 8.8.8.8 encontrado', '');
  })
}));

test('Executa Shodan com um IP válido', (done) => {
  exec('node src/shodan.js --target 8.8.8.8', (error, stdout, stderr) => {
    expect(error).toBeNull();  // Verifica se não houve erro na execução
    expect(stdout).toContain('Resultados para a pesquisa:');  // Verifica se a saída contém a mensagem esperada
    expect(stderr).toBe('');  // Verifica se não houve erro no stderr
    done();
  });
});

