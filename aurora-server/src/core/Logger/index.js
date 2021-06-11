require('colors');
const logger = process.stdout;

module.exports = {
    buffer(text){ return this.clean(),logger.write(text); },
    clean(){ return logger.clearLine(), logger.cursorTo(0), this; },
    log(...text){ return this.clean(), console.log(...text),this; },
    error(...text){ return this.log(...text.map(t=>typeof t==='string'?t.red:t)); },
    warn(...text){ return this.log(...text.map(t=>typeof t==='string'?t.yellow:t)); },
    success(...text){ return this.log(...text.map(t=>typeof t==='string'?t.green:t)); },
};