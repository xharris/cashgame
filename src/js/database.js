var DB = {
    connection : {},

    connect: function(callback) {
        this.connection = nwSQL.createConnection({
            host     : db_creds.host,
            user     : db_creds.user,
            password : db_creds.password,
            database : db_creds.database,
            multipleStatements: true
        });

        this.connection.connect(function(err){
            callback(err)
        });

    },

    end: function(callback) {
        this.connection.end(callback);
    },

    query: function(qry, params, callback) {
        this.connection.query(qry, params, callback);
    }
}
