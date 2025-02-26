# API Selection

1. **Chosen API**  
   The **Shodan API** was selected as it provides access to information about internet-connected devices, including vulnerabilities, exposed services, and open ports.

2. **Justification**  
   I chose the Shodan API because cybersecurity is a field I find very interesting and would like to deepen my knowledge in. This API is particularly useful for security audits, allowing professionals to identify exposed services and potential vulnerabilities in internet-connected devices, servers, and IoT systems. Additionally, it does not require authentication for basic searches, making it an accessible tool for learning and security analysis.

SHODAN_API_KEY = 'IPNDTMQb8uSMXg7Nc0ASXZ1Ri2ft4fMY';


# Shodan CLI - IP and Domain Analysis Tool

## 📌 Description
The **Shodan CLI** is a command-line tool that interacts with the [Shodan](https://www.shodan.io/) API to retrieve information about internet-connected devices.

With this tool, you can check:
- **Location and organization** associated with an IP.
- **Services and open ports**.
- **Known vulnerabilities** related to the IP.
- **Operating system and ASN**.

## 🎯 Motivation
Shodan is a specialized search engine for finding devices on the internet. This tool can be useful for **security professionals**, **network administrators**, and **researchers**, allowing them to identify potential vulnerabilities and improve infrastructure security.

## 🚀 Installation
### Prerequisites
- **Node.js** (version 14+)
- **NPM or Yarn**

### Installation Steps
1. Clone this repository:
   ```sh
   git clone https://github.com/your-user/shodan-cli.git
   cd shodan-cli
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. The CLI is now ready to use! 🎉

## 🛠️ Usage
### Basic Commands
- Check an IP or domain:
  ```sh
  node shodan-cli.js --target example.com
  ```
- Display results in JSON format:
  ```sh
  node shodan-cli.js --target example.com --output json
  ```
- Filter only known vulnerabilities:
  ```sh
  node shodan-cli.js --target example.com --filter vulnerabilities
  ```
- Save results to a JSON file:
  ```sh
  node shodan-cli.js --target example.com --save
  ```
- Display help:
  ```sh
  node shodan-cli.js --help
  ```

## 📡 API Used
This project uses the public **Shodan** API:
- **Endpoint used:**
  ```sh
  https://api.shodan.io/shodan/host/{IP}?key={API_KEY}
  ```
- **Parameters:**
  - `{IP}`: The IP address to query.
  - `{API_KEY}`: Shodan API key.
- **API Response:** Returns details about the queried IP, including location, active services, open ports, and potential vulnerabilities.

## 🧩 Output Examples
### 📜 Formatted Output
```
════════════════════════════════════
🔍  Results for IP: 192.168.1.1
════════════════════════════════════
🌍  Location: São Paulo, Brazil
🏢  Organization: Company X
📡  ASN: AS12345
🖥️  Operating System: Linux
📌  Coordinates: Latitude -23.55, Longitude -46.63
────────────────────────────────────
🚪  Open Ports: 80, 443, 22
────────────────────────────────────
⚠️  Found Vulnerabilities:
   - 🔴 CVE-2021-12345
   - 🔴 CVE-2020-6789
────────────────────────────────────
🛠️  Detected Services:
┌───────┬───────────────┬───────────┐
│ Port  │ Product       │ Version   │
├───────┼───────────────┼───────────┤
│ 80    │ Apache httpd  │ 2.4.46    │
│ 443   │ OpenSSL       │ 1.1.1     │
│ 22    │ OpenSSH       │ 8.2       │
└───────┴───────────────┴───────────┘
════════════════════════════════════
```

### 📝 JSON Output
```json
{
  "ip": "192.168.1.1",
  "country": "Brazil",
  "organization": "Company X",
  "asn": "AS12345",
  "os": "Linux",
  "latitude": -23.55,
  "longitude": -46.63,
  "ports": [80, 443, 22],
  "vulnerabilities": ["CVE-2021-12345", "CVE-2020-6789"],
  "services": [
    { "port": 80, "product": "Apache httpd", "version": "2.4.46" },
    { "port": 443, "product": "OpenSSL", "version": "1.1.1" },
    { "port": 22, "product": "OpenSSH", "version": "8.2" }
  ]
}
```

## 🏗️ Code Structure
```
shodan-cli/
│── shodan-cli.js      # Main CLI file
│── package.json       # Project dependencies
│── README.md          # Documentation
│── .eslintrc.json     # ESLint configuration (optional)
│── tests/             # Unit tests
└── utils/             # Helper functions
```

## ✅ Future Enhancements
- Improved output formatting.
- Option to export results in CSV format.
- Better integration with databases.

## 📜 License
This project is licensed under the **MIT License** - see the `LICENSE` file for details.



