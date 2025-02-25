export default {
    transform: {
      '^.+\\.js$': 'babel-jest', 
    },
    moduleNameMapper: {
      '^.+\\.css$': 'identity-obj-proxy', 
    },
  };
  