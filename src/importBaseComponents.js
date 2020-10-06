// As per https://vuejs.org/v2/guide/components-registration.html#Automatic-Global-Registration-of-Base-Components

import Vue from "vue";
import { upperFirst, camelCase } from "lodash";

const requireComponent = require.context(
  "./components",
  false,
  /Sk[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(
      fileName
        .split("/")
        .pop()
        .replace(/\.\w+$/, "")
    )
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});
