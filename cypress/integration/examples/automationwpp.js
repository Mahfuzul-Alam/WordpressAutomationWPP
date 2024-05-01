require("dotenv").config();

describe("My Test Suite", function () {
  it("My FirstTest case", function () {
    // Get username and password from environment variables
    const username = Cypress.env("USERNAME");
    const password = Cypress.env("PASSWORD");

    //Visiting the website
    cy.visit(
      "http://localhost/wordpress/wp-login.php?loggedout=true&wp_lang=en_US"
    );

    //For login
    cy.wait(2000);
    cy.get("#user_login").type(username);
    cy.get("#user_pass").type(password);
    cy.get("#wp-submit").click();

    // Clicking on the Plugins menu
    cy.get("#menu-plugins > .wp-has-submenu > .wp-menu-name").click();

    // Checking if the Dark Mode Plugin is activated
    cy.contains("tr", "WP Dark Mode")
      .should("be.visible")
      .then(($plugin) => {
        if ($plugin.length > 0) {
          // Plugin is already installed, check if activated
          cy.log("WP Dark Mode Plugin is already installed.");
          cy.get("tr.active > .plugin-title > strong")
            .should("be.visible")
            .then(() => {
              cy.log("WP Dark Mode is already activated.");
            });
        } else {
          // Plugin is not installed, install it and activate
          cy.get(".page-title-action").click();
          cy.get("#search-plugins").type("WP Dark Mode");
          cy.get(
            ".plugin-card-wp-dark-mode > .plugin-card-top > .action-links > .plugin-action-buttons > :nth-child(1) > .install-now"
          ).click();
          cy.wait(3000);
          cy.get(
            ".plugin-card-wp-dark-mode > .plugin-card-top > .action-links > .plugin-action-buttons > :nth-child(1) > .button"
          ).click();
          cy.get("#activate-wp-dark-mode").click();
        }
      });

    //Navigating to the WP Dark Mode & continue.
    cy.get(
      "#toplevel_page_wp-dark-mode > .wp-has-submenu > .wp-menu-name"
    ).click();

    // Set the viewport size to a specific width and height
    cy.viewport(1280, 720);

    // Enabling Admin Dashboard Dark Mode
    cy.wait(3000);
    cy.get(
      ":nth-child(1) > .wp-dark-mode-admin-sidebar-nav-container > .justify-between"
    ).click();
    cy.get(".inactive").click();

    // Check if the Admin Dashboard Dark Mode button is off
    cy.get(".relative > .w-5").then(($button) => {
      if ($button.parent().hasClass("bg-slate-200")) {
        // Click on the Admin Dashboard Dark Mode button to turn it on
        cy.wrap($button).click();
      } else {
        // Admin Dashboard Dark Mode button is already on, no need to do anything
        cy.log("Admin Dashboard Dark Mode button is already on");
      }
    });

    //verifying if the dark mode is working on the admin dashboard or not
    cy.get("#wp-admin-bar-wp-dark-mode-admin-bar-switch > .ab-item")
      .should("be.visible")
      .click();

    //Navigating to dark mode
    cy.get(
      "#toplevel_page_wp-dark-mode > .wp-has-submenu > .wp-menu-name"
    ).click();

    //Changing the “Floating Switch Style” from the default selections to the 2nd one
    cy.get(
      ":nth-child(2) > .wp-dark-mode-admin-sidebar-nav-container > .justify-between"
    ).click();
    cy.get('[href="#/switch"]').click();
    cy.get(".rounded.gap-6 > .rounded > .flex-wrap > :nth-child(2)").click();

    //Selecting Custom Switch size & Scaling it to 220.
    cy.get(".bg-gray-50 > :nth-child(6) > span").click();
    cy.get(".range").then(($range) => {
      // Set the max attribute to 220
      $range[0].setAttribute("max", "220");

      // Set the value to the new maximum range
      $range[0].value = "220";

      // Trigger a change event on the input
      cy.wrap($range).trigger("input").trigger("change");
    });

    //Changing the Floating Switch Position (Left Bottom)
    cy.get(".cursor-pointer") // Select the element by its class
      .contains("Left") // Find the element containing the text 'Left'
      .click(); // Click on the element

    //save changes
    cy.get(".bg-blue-500").click();

    //Disabling keyboard shortcut from accessablity setting
    cy.get(
      ":nth-child(3) > .wp-dark-mode-admin-sidebar-nav-container > .justify-between > .flex > .text-base"
    ).click();
    cy.get(
      '.wp-dark-mode-admin-sidebar-nav-container > .flex-col > [href="#/accessibility"]'
    ).click();

    //save changes
    cy.get(".save-buttons > .bg-blue-500");

    //wait
    cy.wait(2000);

    //Customization to site animation
    cy.get(
      ":nth-child(2) > .wp-dark-mode-admin-sidebar-nav-container > .justify-between > .flex > .text-base"
    ).click();
    cy.get('[href="#/animation"]').click();

    cy.get(".relative > .w-5").then(($button) => {
      if ($button.hasClass("bg-slate-200")) {
        // Click on the animation button to turn it on
        cy.wrap($button).click();
      } else {
        // Animation button is already on, no need to do anything
        cy.log("Animation button is already on");
      }
    });

    // Check if "Pulse" animation is chosen
    cy.contains(".flex", "Pulse").then(($animationOption) => {
      if (!$animationOption.find(".border-blue-600").length) {
        // Choose "Pulse" animation if it's not already chosen
        cy.wrap($animationOption).click();
        cy.get(".bg-blue-500").click();
      } else {
        // Pulse animation is already chosen, no need to do anything
        cy.log('"Pulse" animation is already chosen');
      }
    });

    //Validating whether the Darkmode is working or not from the Frontend
    cy.get('#wp-admin-bar-site-name > [aria-expanded="false"]').click();
    cy.get("._track").should("be.visible").click();
  });
});
