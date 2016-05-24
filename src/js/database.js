var DB = {
    connection : {},

    connect: function() {
        this.connection = nwSQL.createConnection({
            host     : db_creds.host,
            user     : db_creds.user,
            password : db_creds.password,
            database : db_creds.database
        });

        this.connection.connect(function(err){
          if(err){
            return 'Error connecting to Db';
          }
          console.log();
          return 'Connection established'
        });

    },

    end: function(callback) {
        this.connection.end(callback);
    },

    query: function(qry, params, callback) {
        this.connection.query(qry, params, callback);
    }
}
