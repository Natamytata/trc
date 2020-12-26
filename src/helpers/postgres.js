const { Client } = require('pg');

module.exports = class Postgres {
    constructor(config){
        this.config = config;
    }

    async connect(){
        this.client = new Client(this.config);
        await this.client.connect();
    }


    async single(sql, params = []){
        try { 
            return (await this.client.query(sql, params)).rows[0];
        }
        catch(error) {
            throw new Error('Bad request to postgres: ' + error.message);
        }
    }
    async multiple(sql, params = []){
        try { 
            return (await this.client.query(sql, params)).rows;
        }
        catch(error) {
            throw new Error('Bad request to postgres: ' + error.message);
        }
    }
}
