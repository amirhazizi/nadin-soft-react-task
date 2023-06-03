// import the original type declarations
import "i18next"
declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: "en"
    // other
  }
}
