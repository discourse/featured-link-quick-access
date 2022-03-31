export default {
  setupComponent(args, component) {
    component.set(
      "enabled",
      localStorage.getItem("displayQuickAccessFeatureLink") === "true"
    );

    this.appEvents.on(
      "featured-link-should-save-quick-access-preference",
      component,
      "savePreference"
    );

    component.savePreference = () => {
      localStorage.setItem("displayQuickAccessFeatureLink", component.enabled);
    };
  },

  teardownComponent(component) {
    this.appEvents.on(
      "featured-link-should-save-quick-access-preference",
      component,
      "savePreference"
    );
  },

  actions: {
    handleEnabledChange(event) {
      this.set("enabled", event.target.checked);
    },
  },
};
