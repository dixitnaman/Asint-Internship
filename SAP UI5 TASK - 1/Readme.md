# Asint Internship Task: SAPUI5 Fiori App

This project was developed during an internship at **Asint**, focused on building a complete **SAPUI5 Fiori application**. It demonstrates core SAP Fiori concepts such as CRUD operations, i18n, formatting, search/sort/filter functionality, and dynamic UI behavior using both mock/local data and live OData services.

---

## Checklist Features Implemented

- **Fiori App Template Setup**  
  Application scaffolded using the standard SAP Fiori Worklist template.

- **Entity-Based CRUD Operations**  
  Create, Read, Update, Delete implemented using mock model or local JSON data.

- **Search, Sort, and Filter**  
  Implemented using `FilterBar`, table headers, and input-based filtering.

- **Routing & Navigation**  
  Page navigation configured via `manifest.json` and handled using router events.

- **i18n Support**  
  Full localization support using `i18n` resource bundles.

- **Data Formatters**  
  Custom formatter functions applied to control display formatting of data.

- **Table Personalization & FilterBar**  
  Column visibility, ordering, and filter options enabled for better UX.

- **OData Integration (Northwind V2)**  
  Supports both live **Northwind V2 OData service** and mock data via local JSON.

- **Complex UI Controls**

  - `FlexibleColumnLayout` for multi-page responsive layout
  - `VizFrame` for charts and data visualization
  - `ResponsiveTable` or `TreeTable` for tabular/hierarchical data

- **Dynamic UI Rendering**  
  UI fields and elements are rendered based on **OData metadata**.

- **Basic Unit Testing**  
  Unit tests included to verify core utility and formatting logic.

---

## 🚀 Getting Started

### Run with Northwind OData Service

```
npm start
```
