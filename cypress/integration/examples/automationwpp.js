describe("My Test Suite", function () {
  it("My FirstTest case", function () {
    //Visiting the website
    cy.visit(
      "http://localhost/wordpress/wp-login.php?loggedout=true&wp_lang=en_US"
    );

    //For login
    cy.wait(2000);
    cy.get("#user_login").type("admin");
    cy.get("#user_pass").type("*****");
    cy.get("#wp-submit").click();

    //Checking the Plugin is activated or not
    cy.get("#menu-plugins > .wp-has-submenu > .wp-menu-name").click();
    cy.get("#bulk-action-selector-top").select("Activate");
    cy.get("#doaction").click();
    cy.get("tr.active > .plugin-title > strong").should("be.visible");

    //Navigating to the WP Dark Mode & continue.
    cy.get(
      "#toplevel_page_wp-dark-mode-settings > .wp-has-submenu > .wp-menu-name"
    ).click();

    //Enabling Backend Darkmode from Settings -> General Settings.
    cy.get(
      ".enable_os_mode > td > .switcher > :nth-child(1) > .wppool-switcher > .wp-dark-mode-ignore"
    ).then((button) => {
      if (button.is(":disabled")) {
        // Button is disabled, enable it
        cy.get(button).click();
      }
      cy.get(
        '#wp_dark_mode_general > form > [style="padding-left: 10px"] > .submit > #save_settings'
      ).click();

      // Validating whether the Darkmode is working or not on the Admin Dashboard.
      cy.get('#wp-admin-bar-my-account > [aria-haspopup="true"]').click();
      cy.get(".dark").click();

      //Navigate to the WP Dark Mode
      cy.get(
        "#toplevel_page_wp-dark-mode-settings > .wp-has-submenu > .wp-menu-name"
      ).click();
      cy.get("#wp_dark_mode_switch-tab > span").click();

      //“Floating Switch Style” from the default selections to another selections
      cy.get(
        '[for="wppool-wp_dark_mode_switch[switch_style][2]"] > .image-choose-img'
      ).click();

      //slider value to 200
      /*   cy.get(".switcher_scale > td > .wppool-slider")
          .invoke("val", 220)
          .click(); */

      //Changing the Floating Switch Position (Left Bottom)
      cy.get('select[name="wp_dark_mode_switch[switcher_position]"]').select(
        "Left Bottom",
        { force: true }
      );
      cy.get(
        '#wp_dark_mode_switch > form > [style="padding-left: 10px"] > .submit > #save_settings'
      ).click();
      cy.get(
        '#wp_dark_mode_switch > form > [style="padding-left: 10px"] > .submit > #save_settings'
      ).click();

      //Disabling Keyboard Shortcut from the Accessibility Settings.
      cy.get("#wp_dark_mode_accessibility-tab > span").click();
      cy.get(
        ".keyboard_shortcut > td > .switcher > :nth-child(1) > .wppool-switcher > .wp-dark-mode-ignore"
      ).click();
      cy.get(
        '#wp_dark_mode_accessibility > form > [style="padding-left: 10px"] > .submit > #save_settings'
      ).click();

      //Enabling “Darkmode Toggle Animation” & change the “Animation Effect” from-
      //-the default selections to any other section
      cy.get("#wp_dark_mode_animation-tab > span").click();
      cy.xpath('//*[@id="wp_dark_mode_animation[animation]"]').select("Roll");
      cy.get(
        '#wp_dark_mode_animation > form > [style="padding-left: 10px"] > .submit > #save_settings'
      ).click();

      //Validate whether the Darkmode is working or not from the Frontend
      cy.get('#wp-admin-bar-site-name > [aria-haspopup="true"]').click();
      cy.get(".dark").click().should("be.visible");
    });
  });
});
