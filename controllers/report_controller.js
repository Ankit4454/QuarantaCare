const Report = require('../models/report');

module.exports.reportStatus = function(req,res){

}

module.exports.viewReport = function(req,res){
    
}

module.exports.delete = function (req, res) {
    Report.findByIdAndDelete(req.params.id).then(function (data) {
        return res.redirect('back');
    }).catch(function (err) {
        req.flash('error', err);
        console.log(`Error while deleting a report ${err}`);
    });
}