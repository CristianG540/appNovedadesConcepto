/**
 * InstitutionDataController
 *
 * @description :: Server-side logic for managing institutiondatas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    'index' : function(req, res , next){
        InstitutionData.find().exec(function(err, inst){
            if(err){ return res.serverError(err); }

            // Envia el array de usuarios a la pagina /views/index.ejs
            res.json({
                'institutions': inst
            });
        });
    }

};

