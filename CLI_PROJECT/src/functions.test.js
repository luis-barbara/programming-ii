import { resolveDomain, processShodanData, displayResults } from './shodan.js'; 

describe('resolveDomain', () => {
  it('deve resolver um domínio para um IP', async () => {
    const ip = await resolveDomain('example.com');
    expect(ip).toMatch(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/);
  });

  it('deve retornar o próprio domínio se a resolução falhar', async () => {
    const domain = 'dominio-inexistente.com';
    const result = await resolveDomain(domain);
    expect(result).toBe(domain);
  });
});

describe('processShodanData', () => {
  it('deve processar os dados da API do Shodan corretamente', () => {
    const mockData = {
      ip_str: '192.168.1.1',
      country_name: 'Brasil',
      org: 'Organização Exemplo',
      asn: 'AS12345',
      os: 'Linux',
      data: [
        {
          port: 80,
          product: 'Apache',
          version: '2.4.41',
          location: {
            city: 'São Paulo',
            region_code: 'SP',
            area_code: '11',
            latitude: -23.5505,
            longitude: -46.6333,
          },
        },
      ],
      ports: [80, 443],
      vulns: { 'CVE-2021-1234': {}, 'CVE-2021-5678': {} },
      tags: ['web', 'server'],
      history: [],
    };

    const processedData = processShodanData(mockData);

    expect(processedData.ip).toBe('192.168.1.1');
    expect(processedData.country).toBe('Brasil');
    expect(processedData.organization).toBe('Organização Exemplo');
    expect(processedData.asn).toBe('AS12345');
    expect(processedData.os).toBe('Linux');
    expect(processedData.latitude).toBe(-23.5505);
    expect(processedData.longitude).toBe(-46.6333);
    expect(processedData.city).toBe('São Paulo');
    expect(processedData.region).toBe('SP');
    expect(processedData.area_code).toBe('11');
    expect(processedData.ports).toEqual([80, 443]);
    expect(processedData.vulnerabilities).toEqual(['CVE-2021-1234', 'CVE-2021-5678']);
    expect(processedData.tags).toEqual(['web', 'server']);
    expect(processedData.history).toEqual([]);
  });
});

describe('displayResults', () => {
  it('deve exibir os resultados corretamente', () => {
    const mockData = {
      ip: '192.168.1.1',
      country: 'Brasil',
      organization: 'Organização Exemplo',
      asn: 'AS12345',
      os: 'Linux',
      latitude: -23.5505,
      longitude: -46.6333,
      city: 'São Paulo',
      region: 'SP',
      area_code: '11',
      ports: [80, 443],
      vulnerabilities: ['CVE-2021-1234', 'CVE-2021-5678'],
      services: [
        {
          port: 80,
          product: 'Apache',
          version: '2.4.41',
        },
      ],
      tags: ['web', 'server'],
      history: [],
    };

    // Mock do console.log para capturar a saída
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    displayResults(mockData);

    // Verifica se o console.log foi chamado com os valores esperados
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Resultados para a pesquisa:'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('192.168.1.1'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Brasil'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Organização Exemplo'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('AS12345'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Linux'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Portas abertas:'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('80'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('443'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Vulnerabilidades encontradas:'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('CVE-2021-1234'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('CVE-2021-5678'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Serviços detectados:'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Apache'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('2.4.41'));

    // Restaura o console.log original
    consoleSpy.mockRestore();
  });
});