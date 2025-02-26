export default {
    transform: {
      '^.+\\.js$': 'babel-jest', 
    },
    moduleNameMapper: {
      '^.+\\.css$': 'identity-obj-proxy', //caso existisse CSS no projeto
    },
  };
  