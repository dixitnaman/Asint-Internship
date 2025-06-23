sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
  (Controller, MessageToast) => {
    "use strict";
    return Controller.extend("ui5.walkthrough.controller.HelloPanel", {
      onShowHello() {
        const i18text = this.getView()
          .getModel("i18n")
          .getResourceBundle()
          .getText("showHelloButtonText");
        console.log(i18text);

        MessageToast.show("Meow", {
          duration: 3000,
          my: sap.ui.core.Popup.Dock.CenterBottom,
          at: sap.ui.core.Popup.Dock.CenterBottom,
          of: window,
        });
      },
      async onOpenDialog() {
        this.oDialog ??= await this.loadFragment({
          name: "ui5.walkthrough.view.HelloDialog",
        });
        this.oDialog.open();
      },

      async onCloseDialog() {
        // new JSONModel({ name: "Hello" });
        this.byId("helloDialog").close();
      },
    });
  }
);
