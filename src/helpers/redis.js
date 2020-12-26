const redis = require("redis");
var bluebird = require("bluebird");
bluebird.promisifyAll(redis.RedisClient.prototype);

module.exports = class Redis {
    constructor(config) {
        this.config = config;
    }

    connect() {
        this.client = redis.createClient(this.config);
    }

    async get(key){
        const value = await this.client.getAsync(
            key).then( 
            (reply) => {
                return reply;
            });
        return value
    }

    set(key,value) {
        this.client.set(key, value);
    }
}