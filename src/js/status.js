var Status = {
    // gender = (male/female)
    getStatusFromID: function(id, gender, callback) {
        gender = gender || "male";
        DB.connection.query('SELECT ' + gender + ' FROM status WHERE id=?', [id], function(err,rows){
            callback(rows[0][gender]);
        });
    }
}
