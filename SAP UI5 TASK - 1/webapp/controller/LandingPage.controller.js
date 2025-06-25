sap.ui.define([
  './BaseController.controller',
  'sap/m/MessageToast',
  'sap/ui/core/ValueState',
  'sap/ui/model/Filter',
  'sap/ui/model/FilterOperator',
  'sap/ui/model/Sorter',
  'sap/m/MessageBox'
], function (Controller, MessageToast, ValueState, Filter, FilterOperator, Sorter, MessageBox) {
  'use strict';

  return Controller.extend("ui5.app.controller.LandingPage", {

    onPress: function () {
      var message = this.getModel().getProperty("/message");
      MessageToast.show(message);
    },

    formatScoreState: function (iState) {
      if (iState > 80) {
        return ValueState.Success;
      } else if (iState > 60) {
        return ValueState.Warning;
      } else {
        return ValueState.Error;
      }
    },

    formatName: function (sFname, sLname) {
      var i18nText = this.getResourceBundle();
      return i18nText.getText("combine_names", [sFname, sLname]);
    },

    searchEmployee: function (oEvt) {
      var sQuery = oEvt.getParameter("query"),
          oTable = this.byId("employeeTable"),
          oBinding = oTable.getBinding("items"),
          aFilter = [],
          oFilter = null;

      if (sQuery.length !== 0) {
        aFilter = [
          new Filter("firstName", FilterOperator.Contains, sQuery),
          new Filter("lastName", FilterOperator.Contains, sQuery)
        ];
        oFilter = new Filter({
          filters: aFilter,
          and: false
        });
      }

      oBinding.filter(oFilter);
    },

    openSettings: function () {
      if (!this.employeeSettings) {
        this.employeeSettings = this.loadFragment({
          name: "in.naman.ui5.app.fragment.EmployeeSettings"
        });
      }

      this.employeeSettings.then(function (oDialog) {
        oDialog.open();
      });
    },

    applySettings: function (oEvt) {
      var sortItem = oEvt.getParameter("sortItem"),
          groupItem = oEvt.getParameter("groupItem"),
          sortDesc = oEvt.getParameter("sortDescending"),
          groupDesc = oEvt.getParameter("groupDescending"),
          oTable = this.byId("employeeTable"),
          oBinding = oTable.getBinding("items"),
          aSorters = [];

      if (sortItem) {
        aSorters.push(new Sorter(sortItem.getKey(), sortDesc));
      }

      if (groupItem) {
        aSorters.push(new Sorter(groupItem.getKey(), groupDesc, true));
      }

      oBinding.sort(aSorters);
    },

    createEmployee: function () {
      this.getRouter().navTo("createWithoutIndex");
    },

    navigate: function (oEvent) {
      var oSource = oEvent.getSource(),
          oContext = oSource.getBindingContext("empModel"),
          sPath = oContext.getPath(),
          iIndex = sPath.split("/")[2];

      this.getRouter().navTo("create", { index: iIndex });
    },

    onEditEmployee: function (oEvent) {
      const oContext = oEvent.getSource().getBindingContext("empModel");
      const sPath = oContext.getPath();         // "/employees/0"
      const iIndex = sPath.split("/")[2];       // "0"
      this.getRouter().navTo("create", { index: iIndex });  // ✅ MUST use "create/{index}"
    },

    onDeleteEmployee: function (oEvent) {
      var oModel = this.getModel("empModel");
      var oContext = oEvent.getSource().getBindingContext("empModel");
      var sPath = oContext.getPath();
      var iIndex = parseInt(sPath.split("/")[2]);

      MessageBox.confirm("Are you sure you want to delete this employee?", {
        onClose: function (sAction) {
          if (sAction === MessageBox.Action.OK) {
            var aEmployees = oModel.getProperty("/employees");
            aEmployees.splice(iIndex, 1); // Remove the selected employee
            oModel.setProperty("/employees", aEmployees);
            MessageToast.show("Employee deleted.");
          }
        }
      });
    }
  });
});


