/**
 * SettingsController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  profile: function(req, res, next) {
    InstitutionData.find().exec(function(err, inst){
      var institUniq;
      if(err){ return res.serverError(err); }

      // con lodash busco los documetos unicos segun el atributo 'daneInstitucion'
      institUniq = _.uniq(inst, 'daneInstitucion');
      // aqui busco los documentos donde el departamento sea antioquia
      institUniq = _.where(institUniq, {'codDepartamento':5});

      // Envia el array de usuarios a la pagina /views/index.ejs
      res.view({
          'institutions': institUniq
      });
    });
  }
};
