sap.ui.define([
  'sap/ui/core/mvc/Controller'
], function (Controller) {
  'use strict';
  return Controller.extend("ui5.app.controller.BaseController", {
    getModel(sModelName) {
      return this.getOwnerComponent().getModel(sModelName);
    },
    setModel(oModel, sModelName) {
      this.getOwnerComponent().setModel(oModel,sModelName);
    },
    getResourceBundle() {
      return this.getOwnerComponent().getModel("i18n").getResourceBundle();
    },
    getRouter(){
      return this.getOwnerComponent().getRouter();
    }
  });
});