export default {
    transform: {
      '^.+\\.js$': 'babel-jest', // Transforma arquivos .js usando babel-jest
    },
    moduleNameMapper: {
      '^.+\\.css$': 'identity-obj-proxy', // Caso se use CSS no projeto, mapeia o CSS para um proxy
    },
  };
  