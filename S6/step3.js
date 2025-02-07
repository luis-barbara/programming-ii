function traverse(obj, path = []) {  
    if (typeof obj !== 'object') {  
      console.log(path.join('/'), '->', obj);  
      return;  
    }  
    for (const key in obj) {  
      traverse(obj[key], [...path, key]);  
    }  
  }  
  
  const directories = {  
    src: { utils: { 'math.js': 'content' }, app: 'index.js' },  
    public: 'assets'  
  };  
  traverse(directories);  