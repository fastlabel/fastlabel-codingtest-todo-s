import { generateRoutes, ExtendedRoutesConfig } from "tsoa";

(async () => {
  const routeOptions: ExtendedRoutesConfig = {
    entryFile: "src/index.ts",
    noImplicitAdditionalProperties: "throw-on-extras",
    routesDir: "src/middlewares/tsoa",
    basePath: "v1",
    controllerPathGlobs: ["src/controllers/**/*.ts"],
    iocModule: "src/middlewares/inversify/ioc.ts",
  };
  await Promise.all([generateRoutes(routeOptions)]);
})();
