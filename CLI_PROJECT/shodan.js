const yargs = require('yargs');
const dns = require('node:dns').promises;
const fs = require('node:fs');

const SHODAN_API_KEY = 'IPNDTMQb8uSMXg7Nc0ASXZ1Ri2ft4fMY';


/**
 * Fetches data from the Shodan API for a given IP address.
 * @param {string} ip - The IP address to query.
 * @returns {Promise<Object>} - A promise that resolves to the API response.
 * @throws {Error} - Throws an error if the request fails.
 */
const fetchShodanData = async (ip) => {
  const url = `https://api.shodan.io/shodan/host/${ip}?key=${SHODAN_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.statusText}`);
  }
  return response.json();
};


/**
 * Resolves a domain to an IP address.
 * @param {string} domain - The domain name to resolve.
 * @returns {Promise<string>} - A promise that resolves to the IP address.
 */
const resolveDomain = async (domain) => {
  try {
    const addresses = await dns.resolve(domain);
    return addresses[0];
  } catch {
    return domain;
  }
};

/**
 * Processes the data received from the Shodan API.
 * @param {Object} data - The raw data from the API.
 * @returns {Object} - Processed data with key information extracted.
 */
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

/**
 * Displays the results in a formatted way.
 * @param {Object} data - The processed data to display.
 */
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

/**
 * Saves the processed data to a JSON file.
 * @param {Object} data - The processed data to save.
 */
const saveResultsToFile = (data) => {
  const filename = `shodan_results_${data.ip}.json`; // Nome do arquivo com o IP
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf8');
  console.log(`✅ Resultados salvos em ${filename}`);
};

/**
 * Main function to handle CLI arguments and execute logic.
 */
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

/**
 * Saves the processed data if --save is true
 */
    if (argv.save) {
      saveResultsToFile(processedData);
    }
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
};

main();