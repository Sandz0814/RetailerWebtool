const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter', // For Html Reports
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      screenshotOnRunFailure = true
      
      // for Html reports
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
