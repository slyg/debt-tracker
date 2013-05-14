var compileLessData = require('./assets/compileLessData');

compileLessData("@import \"variables.less\";\n.coucou{border:4px;}").then(console.log);