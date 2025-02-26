const winston = require("winston")

const logger = winston.createLogger({  
    level: 'error',  
    transports: [new winston.transports.File({ //ou [new winston.transports.Console()]
    filename: "cenas.log"  
    })]
  });  
  



class ValidationError extends Error {  
    constructor(message) {  
      super(message);  
      this.bananas = message;
      logger.info(`ValidationError ${this.bananas} created`);    
    }  
  }  
  


try {
    const cenas = false;
    if (!cenas) {
        logger.Error("Cenas is not valid");
        throw new ValidationError("BANG");
    }
}
    catch(e) {
        if (e instanceof(ValidationError)) {
            logger.error("cenas", e);
            console.info("validationError")
        }
        else {
            logger.error(e)
            console.error("Common error")
        }
    }