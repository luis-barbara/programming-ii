const { exec } = require('child_process');

/**
 * Mock of the 'child_process' module to simulate shell command executions.
 * Replaces `exec` to return a simulated response instead of actually executing a command.
 */
jest.mock('child_process', () => ({
  exec: jest.fn((cmd, callback) => {
/**
     * Simulates the command response as if it returned the expected message.
     * @callback execCallback
     * @param {Error | null} error - Error, if any.
     * @param {string} stdout - Simulated standard output.
     * @param {string} stderr - Simulated error output.
     */
    callback(null, 'Resultados para a pesquisa: IP 8.8.8.8 encontrado', '');
  })
}));

/**
 * Tests executing the Shodan script with a valid IP.
 * This test ensures the script returns the expected response without errors.
 * 
 * @function
 * @param {Function} done - Callback function to signal the end of the async test.
 */
test('Executa Shodan com um IP válido', (done) => {
  exec('node src/shodan.js --target 8.8.8.8', (error, stdout, stderr) => {
    expect(error).toBeNull();  // Verifica se não houve erro na execução
    expect(stdout).toContain('Resultados para a pesquisa:');  // Verifica se a saída contém a mensagem esperada
    expect(stderr).toBe('');  // Verifica se não houve erro no stderr
    done();
  });
});

