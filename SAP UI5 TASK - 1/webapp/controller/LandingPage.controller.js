sap.ui.define(
  [
    "./BaseController.controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
  ],
  function (Controller, MessageToast, Filter, FilterOperator, Sorter) {
    "use strict";

    // App ke load hone par 3 default employees add karta hai, agar list empty ho
    return Controller.extend("ui5.app.controller.LandingPage", {
      onInit() {
        const oModel = this.getModel("empModel"); // empModel ko access kar rahe hai
        const aEmployees = oModel.getProperty("/employees"); // "/employees" array ko get kiya

        if (aEmployees.length === 0) {
          oModel.setProperty("/employees", [
            { firstName: "AB", lastName: "BC", age: 25, salary: 60000 },
            { firstName: "CD", lastName: "DE", age: 30, salary: 75000 },
            { firstName: "EF", lastName: "FG", age: 28, salary: 70000 },
          ]);
        }
      },

      // Naam ko format karta hai (First + Last) i18n se
      formatName(sFname, sLname) {
        var i18nText = this.getResourceBundle();
        return i18nText.getText("combine_names", [sFname, sLname]);
      },

      // Search field se filter karta hai table ko firstName ya lastName ke basis par
      searchEmployee(oEvt) {
        var sQuery = oEvt.getParameter("query"), // Search box ka query le rahe
          oTable = this.byId("employeeTable"), // XML table reference le rahe (id = employeeTable)
          oBinding = oTable.getBinding("items"), // Table ke items binding access
          aFilter = [],
          oFilter = null;

        if (sQuery.length !== 0) {
          aFilter = [
            new Filter("firstName", FilterOperator.Contains, sQuery),
            new Filter("lastName", FilterOperator.Contains, sQuery),
          ];
          oFilter = new Filter({
            filters: aFilter,
            and: false,
          });
        }

        oBinding.filter(oFilter); // Filter apply kar diya table pe
      },

      // Sorting ka settings dialog open karta hai (fragment ke through)
      openSettings() {
        if (!this.employeeSettings) {
          this.employeeSettings = this.loadFragment({
            name: "ui5.app.fragment.EmployeeSettings",
          });
        }

        this.employeeSettings.then(function (oDialog) {
          oDialog.open();
        });
      },

      // Sorting apply karta hai jo user ne dialog me select kiya
      applySettings(oEvt) {
        var sortItem = oEvt.getParameter("sortItem"),
          sortDesc = oEvt.getParameter("sortDescending"),
          oTable = this.byId("employeeTable"),
          oBinding = oTable.getBinding("items"),
          aSorters = [];

        if (sortItem) {
          aSorters.push(new Sorter(sortItem.getKey(), sortDesc));
        }

        oBinding.sort(aSorters);
      },

      // Create page pe le jata hai bina kisi employee index ke (naya create karne ke liye)
      createEmployee() {
        this.getRouter().navTo("createWithoutIndex");
      },

      // Kisi employee pe click karne par uske index ke sath Create page pe le jata hai (edit mode)
      navigate(oEvent) {
        var oSource = oEvent.getSource(), // Button ya element jis pe click hua
          oContext = oSource.getBindingContext("empModel"), // BindingContext fetch from empModel
          sPath = oContext.getPath(), // e.g. "/employees/1"
          iIndex = sPath.split("/")[2]; // Extract index = 1

        this.getRouter().navTo("create", { index: iIndex }); // Route to `create/1` => Edit mode
      },

      // Edit button press hone par employee edit karne ke liye routing karta hai
      onEditEmployee(oEvent) {
        const oContext = oEvent.getSource().getBindingContext("empModel"); // Binding context of selected item
        const sPath = oContext.getPath(); // e.g. "/employees/0"
        const iIndex = sPath.split("/")[2]; // Index extract
        this.getRouter().navTo("create", { index: iIndex }); // Routing to Create page with index
      },

      // Delete button se employee ko list se hata deta hai
      onDeleteEmployee(oEvent) {
        var oModel = this.getModel("empModel"); // empModel access
        var oContext = oEvent.getSource().getBindingContext("empModel"); // Get context of button pressed
        var sPath = oContext.getPath();
        var iIndex = parseInt(sPath.split("/")[2]); // Index extract from path

        var aEmployees = oModel.getProperty("/employees"); // Full employee array
        aEmployees.splice(iIndex, 1); // Us index ka data remove
        oModel.setProperty("/employees", aEmployees); // Updated list back to model
        MessageToast.show("Employee deleted."); // Confirmation message
      },
    });
  }
);
