sap.ui.define([
  'sap/ui/core/mvc/Controller'
], function (Controller) {
  'use strict';
  return Controller.extend("ui5.app.controller.BaseController", {
    getModel: function (sModelName) {
      return this.getOwnerComponent().getModel(sModelName);
    },
    setModel: function (oModel, sModelName) {
      this.getOwnerComponent().setModel(oModel,sModelName);
    },
    getResourceBundle : function() {
      return this.getOwnerComponent().getModel("i18n").getResourceBundle();
    },
    getRouter : function(){
      return this.getOwnerComponent().getRouter();
    }
  });
});