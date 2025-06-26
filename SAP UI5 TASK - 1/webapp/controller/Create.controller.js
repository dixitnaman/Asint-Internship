sap.ui.define([
  './BaseController.controller',
  'sap/m/MessageToast'
], function (Controller, MessageToast) {
  'use strict';

  return Controller.extend("ui5.app.controller.Create", {
    onInit() {
      const oRouter = this.getRouter(); //tab call hota hai: Jab controller initialize hota hai.
      oRouter.getRoute("create").attachPatternMatched(this._onPatternMatched, this); 
      oRouter.getRoute("createWithoutIndex").attachPatternMatched(this._onPatternMatched, this);//Router ke "create" aur "createWithoutIndex" routes pe listener lagata hai.
    },

    _onPatternMatched(oEvent) {
      const oModel = this.getModel("empModel");
      const sIndex = oEvent.getParameter("arguments").index;
      const oView = this.getView();
      const oTitle = oView.byId("formTitle");

      if (sIndex !== undefined && sIndex !== null && sIndex !== "") {
        this._editIndex = parseInt(sIndex);
        const oEmployee = oModel.getProperty("/employees/" + this._editIndex);
        if (oEmployee) {
          oModel.setProperty("/employee", { ...oEmployee });
          if (oTitle) oTitle.setText("Edit Employee");
        } else {
          MessageToast.show("Employee not found.");
          this.getRouter().navTo("landing_page");
        }
      } else {
        this._editIndex = null;
        oModel.setProperty("/employee", {
          firstName: "",
          lastName: "",
          age: "",
          salary: ""
        });
        if (oTitle) oTitle.setText("Create New Employee");
      }
    },

    onSave() {
      const oModel = this.getModel("empModel");
      const oEmployee = oModel.getProperty("/employee");
      const aEmployees = oModel.getProperty("/employees") || [];

      if (!oEmployee.firstName || !oEmployee.lastName) {
        MessageToast.show("Please fill all required fields.");
        return;
      }

      if (Number.isInteger(this._editIndex) && aEmployees[this._editIndex]) {
        aEmployees[this._editIndex] = { ...oEmployee };
        MessageToast.show("Employee updated successfully!");
      } else {
        aEmployees.push({ ...oEmployee });
        MessageToast.show("New employee added!");
      }

      oModel.setProperty("/employees", aEmployees);
      oModel.setProperty("/employee", {
        firstName: "",
        lastName: "",
        age: "",
        salary: ""
      });

      this._editIndex = null;
      this.getRouter().navTo("landing_page");
    },

    onCancel() {
      this.getRouter().navTo("landing_page");
    }
  });
});
