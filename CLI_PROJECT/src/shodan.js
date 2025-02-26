import 'dotenv/config'; 
import { promises as dns } from 'node:dns';
import fs from "node:fs";
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import process from "node:process";


export const SHODAN_API_KEY = process.env.SHODAN_API_KEY;

/**
 * Fetches data from the Shodan API for a given IP address.
 * @param {string} ip - The IP address to query.
 * @returns {Promise<Object>} - A promise that resolves to the API response.
 * @throws {Error} - Throws an error if the request fails.
 */
export const fetchShodanData = async (ip) => {
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
export const resolveDomain = async (domain) => {
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
export const processShodanData = (data) => {
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
export const displayResults = (data) => {
  // Título para a primeira tabela
  console.log("\n🔍  Resultados para a pesquisa:");
  // Tabela para exibir as informações principais
  const mainData = [
    { "IP": data.ip, "Localização": `${data.city || 'Desconhecido'}, ${data.country}`, "Organização": data.organization, "ASN": data.asn, "Sistema Operacional": data.os, "Coordenadas": `Latitude: ${data.latitude}, Longitude: ${data.longitude}` }
  ];
  
  console.table(mainData); // Exibe a tabela com informações principais

  // Exibe as portas abertas em uma tabela
  console.log("\n🚪  Portas abertas:");
  if (data.ports.length > 0) {
    const portsTable = data.ports.map(port => ({ Porta: port }));
    console.table(portsTable);
  } else {
    console.log("Nenhuma porta aberta encontrada.");
  }

  // Exibe as vulnerabilidades em uma tabela, se houver
  if (data.vulnerabilities.length > 0) {
    console.log("\n⚠️  Vulnerabilidades encontradas:");
    const vulnTable = data.vulnerabilities.map(vuln => ({ Vulnerabilidade: vuln }));
    console.table(vulnTable);
  } else {
    console.log("\n✅  Nenhuma vulnerabilidade conhecida encontrada.");
  }

  // Exibe os serviços detectados em uma tabela
  if (data.services.length > 0) {
    console.log("\n🛠️  Serviços detectados:");
    const serviceTable = data.services.map(service => ({
      Porta: service.port || 'N/A',
      Produto: service.product || 'Desconhecido',
      Versão: service.version || 'Desconhecida'
    }));
    console.table(serviceTable);
  } else {
    console.log("\n📭  Nenhum serviço identificado.");
  }
};

/**
 * Saves the processed data to a JSON file.
 * @param {Object} data - The processed data to save.
 */
export const saveResultsToFile = (data) => {
  const filename = `shodan_results_${data.ip}.json`; // Nome do arquivo com o IP
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf8');
  console.log(`✅ Resultados salvos em ${filename}`);
};

/**
 * Main function to handle CLI arguments and execute logic.
 */
export const cli = async () => {
  const argv = yargs(hideBin(process.argv))
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

    if (argv.save) {
      saveResultsToFile(processedData);
    }
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
};

// Evita a execução automática do `cli()` durante os testes
if (process.env.NODE_ENV !== 'test') {
  cli();
}