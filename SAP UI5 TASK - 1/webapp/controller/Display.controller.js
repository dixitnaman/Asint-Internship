sap.ui.define(["./BaseController.controller"], function (Controller) {
  "use strict";

  return Controller.extend("ui5.app.controller.Display", {
    onInit() {
      this.getRouter()
        .getRoute("display")
        .attachPatternMatched(this._objectRouteMatched.bind(this));
    },

    _objectRouteMatched(oEvt) {
      const oParams = oEvt.getParameter("arguments"),
        sEmployeeId = oParams.employeeid;
      this.bindView(sEmployeeId);
    },

    bindView(sEmployeeId) {
      const oModel = this.getModel();
      oModel.metadataLoaded().then(() => {
        const sContextPath =
          "/" +
          oModel.createKey("Employee", {
            ID: sEmployeeId,
          });
        this.getView().bindElement(sContextPath);
      });
    },

    onSave() {
      const oModel = this.getModel();
      if (oModel.hasPendingChanges()) {
        oModel.submitChanges();
        window.history.go(-1);
      }
    },

    onDelete() {
      const oModel = this.getModel(),
        sPath = this.getView().getBindingContext().getPath();
      oModel.remove(sPath, {
        success: () => {
          window.history.go(-1);
        },
      });
    },
  });
});
