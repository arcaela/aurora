module.exports = (str)=>str.toLowerCase().replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g,($1)=>$1.toUpperCase());