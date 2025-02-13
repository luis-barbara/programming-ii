const axios = require('axios');
const fs = require('fs');

// Substitua pela sua chave de API
const API_KEY = 'SUA_CHAVE_DE_API_AQUI';

// Função para ler a imagem e realizar a requisição
async function detectObjects(imagePath) {
  try {
    const image = fs.readFileSync(imagePath).toString('base64');
    const requestBody = {
      requests: [
        {
          image: {
            content: image,
          },
          features: [
            {
              type: 'LABEL_DETECTION', // Para detecção de objetos
              maxResults: 5, // Número máximo de resultados
            },
          ],
        },
      ],
    };

    // Enviando requisição para o endpoint de anotação de imagens
    const response = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const annotations = response.data.responses[0].labelAnnotations;
    if (annotations) {
      console.log("Objetos detectados:");
      annotations.forEach((annotation) => {
        console.log(`Objeto: ${annotation.description}, Confiança: ${(annotation.score * 100).toFixed(2)}%`);
      });
    } else {
      console.log('Nenhum objeto detectado.');
    }
  } catch (error) {
    console.error('Erro ao enviar a requisição:', error.message);
  }
}

// Exemplo de chamada da função com caminho de imagem
detectObjects('path_to_your_image.jpg');


