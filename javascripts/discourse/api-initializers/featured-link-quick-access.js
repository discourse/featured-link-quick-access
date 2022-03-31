import { apiInitializer } from "discourse/lib/api";
import { iconNode } from "discourse-common/lib/icon-library";

export default apiInitializer("0.11.1", (api) => {
  api.modifyClass("controller:preferences/interface", {
    actions: {
      save() {
        this.appEvents.trigger(
          "featured-link-should-save-quick-access-preference"
        );

        this._super();
      },
    },
  });

  api.decorateWidget("quick-access-profile:before", (helper) => {
    const featuredTopic = api.getCurrentUser()?.featured_topic;
    if (!featuredTopic) {
      return;
    }

    const isEnabled = localStorage.getItem("displayQuickAccessFeatureLink");
    if (isEnabled !== "true") {
      return;
    }

    return helper.h(
      "a.featured-link-quick-access",
      { href: `/t/${featuredTopic.slug}/${featuredTopic.id}/last` },
      [
        iconNode("thumbtack"),
        helper.h("span.featured-topic-title", featuredTopic.title),
      ]
    );
  });
});
