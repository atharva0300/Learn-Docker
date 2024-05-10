/*
Require 
1. mongo ip-address
2. username
3. password
4. PORT
*/ 

module.exports = {
    MONGO_IP : process.env.MONGO_IP || "mongo-app",
    // obtain the IP address from the environment otherwise, use mongo-app
    // container name

    MONGO_PORT : process.env.MONGO_PORT || 27017,
    MONGO_USER : process.env.MONGO_USER,
    MONGO_PASSWORD : process.env.MONGO_PASSWORD
}
