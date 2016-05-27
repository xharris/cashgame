var User = {
    valid: false,
    id: 0,
    username : '',
    ip: nwIP.address().toString(),
    email: '',
    last_login: '',
    stats: {},

    login: function(email, pass, callback) {
        showProgress();
        DB.connection.query('SELECT * FROM users WHERE email=? AND password=?', [email, pass], function(err, rows){
            hideProgress();

            // problem doing query
            if (err) {
                callback(0);
            }
            else {
                // log in existing user
                if (rows.length > 0) {
                    DB.connection.query('UPDATE users SET ip=?, last_login=NOW() WHERE email=? AND password=?',
                        [nwIP.address().toString(), email, pass])
                    this.email = email;
                    this.valid = true;
                    callback(1);
                } else {
                    DB.connection.query('SELECT id, email FROM users WHERE email=?;',[email],function(err, rows){
                        if (rows.length > 0) {
                            // invalid login creds
                            callback(3);
                        } else {
                            this.id = rows.id;
                            // register new user
                            values = [
                                email,
                                pass,
                                nwIP.address().toString(),
                                email,
                                pass
                            ]
                            DB.connection.query('INSERT INTO users (email, password, ip, last_login) VALUES (?,?,?,NOW());'+
                                                'SELECT id FROM users WHERE email=? AND password=?;', values, function(err, rows){
                                if (!err) {
                                    this.valid = true;
                                    this.id = rows[1].id;
                                    this.newUser();
                                    callback(2);
                                } else {
                                    console.log(err)
                                }
                            });
                        }
                    })
                }
            }

        });
    },

    isLoggedIn: function() {
        return this.valid;
    },

    newUser: function() {
        this.stats = {
            'balance': 0,
            'status_id': 1,
            'statusprefix_id': 0,
        }
    },

    saveUser: function() {
        var status_id = 0;
        DB.connection.query('UPDATE general_stats set balance=?, status_id=?, statusprefix_id=? WHERE user_id=?',
            [this.status['balance'], this.id])
    },

    giveStatus: function() {
        DB.connection.query('INSERT INTO status_type (status_id, status_type) VALUES(1, "Train");')
    }

}
