sap.ui.define(["./BaseController.controller"], function (Controller) {
  "use strict";

  return Controller.extend("ui5.app.controller.Display", {
    onInit() {
      this.getRouter()
        .getRoute("display") //Jab URL route = "display" match hota hai, tab _objectRouteMatched() function trigger hota hai.
        .attachPatternMatched(this._objectRouteMatched.bind(this)); //attachPatternMatched() ek event listener hai.
    },

    _objectRouteMatched(oEvt) {
      const oParams = oEvt.getParameter("arguments"),
        sEmployeeId = oParams.employeeid; //Route se employee ID nikaalta hai (jo manifest.json me :employeeid as pattern hai).
      this.bindView(sEmployeeId); //Us ID ko bindView() me pass karta hai.
    },

    bindView(sEmployeeId) {
      const oModel = this.getModel();
      oModel.metadataLoaded().then(() => { //OData model ka metadata load hone ka wait karta hai (required for .createKey()).
        const sContextPath = //Fir createKey() se ek context path banata hai like:
          "/" +
          oModel.createKey("Employee", {
            ID: sEmployeeId,
          });
        this.getView().bindElement(sContextPath);
      });
    },

    onSave() {
      const oModel = this.getModel(); //Agar koi field change kiya hai (model me pendingChanges hain), to OData call se submitChanges() karta hai.
      if (oModel.hasPendingChanges()) {
        oModel.submitChanges();
        window.history.go(-1); //Fir ek page back jaata hai (window.history.go(-1)).
      }
    },

    onDelete() {
      const oModel = this.getModel(),
        sPath = this.getView().getBindingContext().getPath(); //Current view ka bound path (/Employee(ID=123)) leke OData model se remove() call karta hai.
      oModel.remove(sPath, {
        success: () => {
          window.history.go(-1); //Delete hone ke baad ek page back chala jaata hai.
        },
      });
    },
  });
});
