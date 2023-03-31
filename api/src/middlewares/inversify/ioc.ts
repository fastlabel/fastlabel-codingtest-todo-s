import { Container, decorate, injectable } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import { Controller } from "tsoa";

const iocContainer = new Container();

// Makes tsoa's Controller injectable
decorate(injectable(), Controller);

iocContainer.load(buildProviderModule());

export { iocContainer };
