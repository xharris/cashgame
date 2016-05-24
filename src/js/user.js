var User = {
    values : {},
    username : '',

    login: function(email, pass, callback) {
        showProgress();
        console.log(email + pass);
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
                    callback(1);
                } else {
                    DB.connection.query('SELECT email FROM users WHERE email=?',[email],function(err, rows){
                        if (rows.length > 0) {

                            // invalid login creds
                            callback(3);
                        } else {

                            // register new user
                            values = [
                                email,
                                pass,
                                nwIP.address().toString()
                            ]
                            DB.connection.query('INSERT INTO users (email, password, ip, last_login) VALUES (?,?,?,NOW())', values, function(err, rows){
                                if (!err) {
                                    callback(2);
                                }
                            });
                        }
                    })
                }
            }

        });
    }
}
