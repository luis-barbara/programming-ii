#!/usr/bin/env node

const axios = require('axios');
const chalk = require('chalk');
const yargs = require('yargs');

// 🔐 Insira sua chave de API do Shodan
const SHODAN_API_KEY = 'IPNDTMQb8uSMXg7Nc0ASXZ1Ri2ft4fMY';
const SHODAN_BASE_URL = 'https://api.shodan.io';

// 🎯 Configuração do CLI
const argv = yargs
    .command('domain', 'Consulta informações sobre um domínio', {
        target: { describe: 'Domínio para analisar', demandOption: true, type: 'string' }
    })
    .help()
    .alias('help', 'h')
    .argv;

// 🌐 Função para consultar informações sobre um domínio
async function checkDomain(domain) {
    try {
        const cleanDomain = domain.replace(/^https?:\/\//, '');

        const response = await axios.get(`${SHODAN_BASE_URL}/dns/domain/${cleanDomain}?key=${SHODAN_API_KEY}`);
        
        // Cabeçalho
        console.log(chalk.blue(`\n🔍 Informações do domínio: ${cleanDomain}`));
        console.log('='.repeat(80));  // Linha para separar as seções

        // Exibe as Tags associadas ao domínio
        console.log(chalk.green(`Domínio: ${cleanDomain}`));
        console.log(`Tags: ${response.data.tags ? response.data.tags.join(', ') : 'Nenhuma tag encontrada'}`);
        console.log('='.repeat(80));  // Linha para separar as seções

        // Subdomínios encontrados
        console.log(chalk.green(`\n🌐 Subdomínios encontrados:\n`));
        console.log('----------------------------------------');
        console.log(`Subdomínio      | IP               | Portas Abertas`);
        console.log('----------------------------------------');
        if (response.data.subdomains && response.data.subdomains.length > 0) {
            response.data.subdomains.forEach(subdomain => {
                const subdomainData = response.data.data.find(item => item.subdomain === subdomain);
                const ip = subdomainData ? subdomainData.value : 'Desconhecido';
                const ports = subdomainData && subdomainData.ports && subdomainData.ports.length > 0 ? subdomainData.ports.join(', ') : 'Nenhuma porta encontrada';
                console.log(`${subdomain.padEnd(16)}| ${ip.padEnd(17)}| ${ports}`);
            });
        } else {
            console.log(chalk.yellow('  Nenhum subdomínio encontrado.'));
        }
        console.log('----------------------------------------');

        // Exibe outras informações úteis
        console.log(chalk.green(`📌 Tags associadas ao domínio:`));
        if (response.data.tags && response.data.tags.length > 0) {
            console.log(`- ${response.data.tags.join(', ')}`);
        } else {
            console.log(chalk.yellow('Nenhuma tag encontrada.'));
        }

        console.log('='.repeat(80));  // Linha final de separação
    } catch (error) {
        console.log(chalk.red('❌ Erro ao buscar domínio! Verifique se o domínio está correto.'));
        console.log(chalk.red(`Erro: ${error.message}`));  // Mostra a mensagem do erro para mais detalhes
    }
}

// 🚀 Executa a ferramenta
if (argv._.includes('domain')) {
    checkDomain(argv.target);
} else {
    console.log(chalk.yellow('⚠️ Comando inválido! Use --help para ver as opções.'));
}
