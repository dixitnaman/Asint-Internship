sap.ui.define([
  'sap/ui/core/UIComponent',
  'sap/ui/model/json/JSONModel',
  'sap/ui/model/BindingMode'
], function (UIComponent, JSONModel, BindingMode) {
  'use strict';

  return UIComponent.extend("ui5.app.Component", {
    metadata: {
      interfaces: ["sap.ui.core.IAsyncContentCreation"],
      manifest: "json"
    },

    init: function () {
      UIComponent.prototype.init.apply(this, arguments);

      var oData = {
        employee: {
          firstName: "",
          lastName: "",
          age: "",
          salary: "",
        },
        employees: []
      };

      var oModel = new JSONModel(oData);
      oModel.setDefaultBindingMode(BindingMode.TwoWay);
      this.setModel(oModel, "empModel");

      this.getRouter().initialize();
    }
  });
});
