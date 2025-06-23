sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
  ],
  (UIComponent, JSONModel, ResourceModel) => {
    "use strict";

    return UIComponent.extend("ui5.walkthrough.Component", {
      metadata: {
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
        // rootView: {
        //   viewName: "ui5.walkthrough.view.App",
        //   type: "XML",
        //   id: "app",
        // },
        manifest: "json",
      },
      init() {
        UIComponent.prototype.init.apply(this, arguments);
        const oData = {
          recipient: {
            name: "World",
          },
        };
        const data = new JSONModel(oData);
        this.setModel(data, "datamodel");

        //set i18a model on view
        const i18nModel = new ResourceModel({
          bundleName: "ui5.walkthrough.i18n.i18n",
        });

        this.setModel(i18nModel, "i18n");
      },
    });
  }
);
