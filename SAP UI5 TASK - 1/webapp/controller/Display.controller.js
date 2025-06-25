sap.ui.define([
  './BaseController.controller'
], function (Controller) {
  'use strict';

  return Controller.extend("ui5.app.controller.Display", {
    onInit: function () {
      this.getRouter().getRoute("display").attachPatternMatched(this._objectRouteMatched.bind(this));
    },
    _objectRouteMatched: function (oEvt) {
      var oParams = oEvt.getParameter("arguments"),
          sEmployeeId = oParams.employeeid;
          this.bindView(sEmployeeId);
    },
    bindView : function(sEmployeeId){
      var oModel= this.getModel();
      oModel.metadataLoaded().then(function(){
        var sContextPath = "/"+oModel.createKey("Employee",{
          ID : sEmployeeId
        });
        this.getView().bindElement(sContextPath);
      }.bind(this));
    },
    onSave : function(){
      var oModel= this.getModel();
      if(oModel.hasPendingChanges()){
        oModel.submitChanges();
        window.history.go(-1);
      }
    },
    onDelete : function(){
      var oModel= this.getModel(),
          sPath = this.getView().getBindingContext().getPath();
          oModel.remove(sPath,{
            success : function(){
              window.history.go(-1);
            }
          })
    }
  });
});