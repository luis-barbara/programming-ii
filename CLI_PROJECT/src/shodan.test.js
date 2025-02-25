import { cli } from './shodan.js'; 
import yargs from 'yargs';

jest.mock('yargs', () => ({
  ...jest.requireActual('yargs'),
  argv: {
    target: 'example.com',
    output: 'text',
    save: false,
  },
}));

jest.mock('node:dns', () => ({
  resolve: jest.fn(),
}));

describe('cli', () => {
  it('should run successfully with mocked arguments', async () => {
    const mockIp = '8.8.8.8';

    // Mocking DNS resolve to return the mock IP address
    const { resolve } = require('node:dns');
    resolve.mockResolvedValue([mockIp]);

    // Mocking the function fetchShodanData to return a mock response
    const mockShodanData = {
      ip_str: '8.8.8.8',
      country_name: 'United States',
      org: 'Google LLC',
      asn: 'AS15169',
      os: 'Linux',
      data: [{ location: { latitude: 37.4056, longitude: -122.0775, city: 'Mountain View', region_code: 'CA' } }],
      ports: [80, 443],
      vulns: { 'CVE-2020-12345': 'Description of vulnerability' },
      services: [{ port: 80, product: 'Apache', version: '2.4' }],
      tags: ['web server'],
      history: [],
    };
    const fetchShodanData = require('./shodan').fetchShodanData;
    fetchShodanData.mockResolvedValue(mockShodanData);

    await cli();

  });
});
