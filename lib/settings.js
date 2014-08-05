var path = require('path');

module.exports = {
    GLOBALS_HOME 	: path.join(__dirname, '../../..'), /// "C:\\InterSystems\\Cache2015U\\",
    NODE_ROOT    	: process.env.PROGRAMFILES + '\\NodeJS', /// "C:\\Program Files\\nodejs\\"
    CACHE_DOT_NODE_PATH : path.join(__dirname, '../../..', 'bin/cache.node') /// 'C:\\InterSystems\\Cache2015U\\bin\\cache.node'
};
