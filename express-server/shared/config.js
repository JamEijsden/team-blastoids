/**
 * This file is only created to easier find all the package config, to make everything a bit more clear..
 */
const chalk = require('chalk');
const highlightedlog = (text) => console.log(chalk.bold.green(text));
const infolog = (text) => console.log(chalk.blue(text));

let config = {
    host: process.env.npm_package_config_local_host,
    remotehost: process.env.npm_package_config_local_host,
    localhost: process.env.npm_package_config_local_host,
    websocketport: process.env.npm_package_config_local_host,
    websockettickrate: process.env.npm_package_config_local_host,

    dbhost: process.env.npm_package_config_local_host,
    dbcollection: process.env.npm_package_config_local_host,
    dbuser: process.env.npm_package_config_local_host,
    dbsecret: process.env.npm_package_config_local_host,
};

var args = process.argv.slice(2);

args.forEach((val, index, arr) => {
    const split = val.split("=");
    if(split.length == 2){
        config[split[0]] = split[1];
    }
});



module.exports = {
    fields: config,
    dict: function (){
        infolog("Override these settings by using them as params when starting the server.mjs")
        highlightedlog("["+Object.keys(config).join(",")+"]");
    }
};