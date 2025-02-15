const yargs = require('yargs');
const dns = require('node:dns').promises;
const fs = require('node:fs');

const SHODAN_API_KEY = 'IPNDTMQb8uSMXg7Nc0ASXZ1Ri2ft4fMY';

// Função para buscar dados do Shodan
const fetchShodanData = async (ip) => {
  const url = `https://api.shodan.io/shodan/host/${ip}?key=${SHODAN_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.statusText}`);
  }
  return response.json();
};

// Resolve um domínio para um IP
const resolveDomain = async (domain) => {
  try {
    const addresses = await dns.resolve(domain);
    return addresses[0];
  } catch {
    return domain;
  }
};

// Processa os dados da API do Shodan
const processShodanData = (data) => {
  const services = Array.isArray(data.data) ? data.data : [];
  const firstService = services.length > 0 ? services[0] : {};
  const location = firstService.location || {};

  return {
    ip: data.ip_str || 'Desconhecido',
    country: data.country_name || 'Desconhecido',
    organization: data.org || 'Desconhecido',
    asn: data.asn || 'Desconhecido',
    os: data.os || 'Desconhecido',
    latitude: location.latitude || 'Desconhecido',
    longitude: location.longitude || 'Desconhecido',
    city: location.city || 'Desconhecido',
    region: location.region_code || 'Desconhecido',
    area_code: location.area_code || 'Desconhecido',
    ports: data.ports || [],
    vulnerabilities: data.vulns ? Object.keys(data.vulns) : [],
    services: services,
    tags: data.tags || [],
    history: data.history || [],
  };
};

// Exibe os resultados formatados
const displayResults = (data) => {
  console.log('\n════════════════════════════════════');
  console.log(`🔍  Resultados para o IP: ${data.ip}`);
  console.log('════════════════════════════════════');
  console.log(`🌍  Localização: ${data.city || 'Desconhecido'}, ${data.country}`);
  console.log(`🏢  Organização: ${data.organization}`);
  console.log(`📡  ASN: ${data.asn}`);
  console.log(`🖥️  Sistema Operacional: ${data.os}`);
  console.log(`📌  Coordenadas: Latitude ${data.latitude}, Longitude ${data.longitude}`);
  console.log('────────────────────────────────────');
  console.log(`🚪  Portas abertas: ${data.ports.length > 0 ? data.ports.join(', ') : 'Nenhuma'}`);
  console.log('────────────────────────────────────');
  if (data.vulnerabilities.length > 0) {
    console.log('⚠️  Vulnerabilidades encontradas:');
    data.vulnerabilities.forEach((vuln) => {
      console.log(`   - 🔴 ${vuln}`);
    });
  } else {
    console.log('✅  Nenhuma vulnerabilidade conhecida encontrada.');
  }
  console.log('────────────────────────────────────');
  if (data.services.length > 0) {
    console.log('🛠️  Serviços detectados:');
    const serviceTable = data.services.map((service) => ({
      Porta: service.port || 'N/A',
      Produto: service.product || 'Desconhecido',
      Versão: service.version || 'Desconhecida',
    }));
    console.table(serviceTable);
  } else {
    console.log('📭  Nenhum serviço identificado.');
  }
  console.log('════════════════════════════════════\n');
};

// Função para salvar os resultados em um arquivo JSON
const saveResultsToFile = (data) => {
  const filename = `shodan_results_${data.ip}.json`; // Nome do arquivo com o IP
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf8');
  console.log(`✅ Resultados salvos em ${filename}`);
};

// Função principal atualizada
const main = async () => {
  const argv = yargs
    .option('target', {
      alias: 't',
      description: 'O IP ou domínio a ser verificado',
      type: 'string',
      demandOption: true,
    })
    .option('output', {
      alias: 'o',
      description: 'Formato de saída (text ou json)',
      type: 'string',
      choices: ['text', 'json'],
      default: 'text',
    })
    .option('filter', {
      alias: 'f',
      description: 'Filtrar saída (ex: vulnerabilities, ports)',
      type: 'string',
    })
    .option('save', {
      description: 'Salvar os resultados em um arquivo',
      type: 'boolean',
      default: false,
    })
    .help()
    .alias('help', 'h')
    .argv;

  try {
    const target = argv.target;
    const ip = await resolveDomain(target);
    const data = await fetchShodanData(ip);
    const processedData = processShodanData(data);

    if (argv.output === 'json') {
      console.log(JSON.stringify(processedData, null, 2));
    } else {
      if (argv.filter === 'vulnerabilities') {
        console.log(`🔍 Vulnerabilidades para o IP ${processedData.ip}:`);
        console.log(processedData.vulnerabilities.length > 0
          ? processedData.vulnerabilities.join(', ')
          : 'Nenhuma vulnerabilidade encontrada.');
      } else {
        displayResults(processedData);
      }
    }

    // Salva os resultados se --save for true
    if (argv.save) {
      saveResultsToFile(processedData);
    }
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
};

main();