sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    // "sap/ui/model/json/JSONModel",
    // "sap/ui/model/resource/ResourceModel",
  ],
  (Controller, MessageToast, JSONModel, ResourceModel) => {
    "use strict";
    return Controller.extend("ui5.walkthrough.controller.App", {
    //   onInit() {
    //     //oninit func loads only the first time when we nagivate to another page... this loads the data. Used to initialize a model
    //     // const oData = {
    //     //   recipient: {
    //     //     name: "World",
    //     //   },
    //     //   lang: "SAP UI5",
    //     // };
    //     // const data = new JSONModel(oData);
    //     // this.getView().setModel(data, "datamodel");

    //     // //set i18a model on view
    //     // const i18nModel = new ResourceModel({
    //     //   bundleName: "ui5.walkthrough.i18n.i18n"
    //     // });

    //     // this.getView().setModel(i18nModel, "i18n");

    //     // const data2 = new JSONModel({ name: "Dixit Naman" });
    //     // this.getView().setModel(data2, "name1");
    //     //getView means we are getting the view which is associated with the controller and use setmodel to set it... setModel(x,y)-> x is the json model and y is the name we can give to call the model
    //   },
      onShowHello() {
        // this.getView().getModel("dataModel")
        //to call the model, we can set properties using setProperties or set data using setData
        const i18text = this.getView().getModel("i18n").getResourceBundle().getText("showHelloButtonText");
        console.log(i18text);

        MessageToast.show(i18text, {
          duration: 3000,
          my: sap.ui.core.Popup.Dock.CenterBottom,
          at: sap.ui.core.Popup.Dock.CenterBottom,
          of: window,
        });
      },
    });
  }
);
