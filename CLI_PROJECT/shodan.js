const yargs = require('yargs'); 
const dns = require('dns').promises;


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
    return addresses[0]; // Primeiro IP encontrado
  } catch {
    return domain; // Se falhar, assume que já é um IP
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
  console.log(`🔍 Resultados para o IP ${data.ip}:`);
  console.log(`- Localização: ${data.city || 'Desconhecido'}`);
  console.log(`- País: ${data.country}`);
  console.log(`- Organização/ISP: ${data.organization}`);
  console.log(`- ASN: ${data.asn}`);
  console.log(`- Sistema Operacional: ${data.os}`);
  console.log(`- Latitude: ${data.latitude}, Longitude: ${data.longitude}`);
  console.log(`- Portas abertas: ${data.ports.join(', ') || 'Nenhuma'}`);

  if (data.vulnerabilities.length > 0) {
    console.log(`- ⚠ Vulnerabilidades encontradas: ${data.vulnerabilities.join(', ')}`);
  } else {
    console.log('- ✅ Nenhuma vulnerabilidade conhecida encontrada.');
  }

  if (data.services.length > 0) {
    console.log('- Serviços encontrados:');
    data.services.forEach((service) => {
      const product = service.product || 'Desconhecido';
      const version = service.version || 'Desconhecida';
      console.log(`  * Porta ${service.port}: ${product}, Versão: ${version}`);
    });
  }

  if (data.tags.length > 0) {
    console.log('- Tags associadas:');
    data.tags.forEach((tag) => console.log(`  * ${tag}`));
  }

  if (data.history.length > 0) {
    console.log('- Histórico de IP:');
    data.history.forEach((item) => console.log(`  * ${item.timestamp}: ${item.ip}`));
  }
};

// Função principal
const main = async () => {
  const argv = yargs
    .option('target', {
      alias: 't',
      description: 'O IP ou domínio a ser verificado',
      type: 'string',
      demandOption: true,
    })
    .help()
    .alias('help', 'h')
    .argv;

  try {
    const target = argv.target;
    const ip = await resolveDomain(target);
    const data = await fetchShodanData(ip);
    const processedData = processShodanData(data);
    displayResults(processedData);
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
};

main();
