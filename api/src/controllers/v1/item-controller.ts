import {
  Controller,
  Get,
  Route,
  SuccessResponse,
  Request,
  Post,
  Body,
  Put,
  Delete,
  Tags,
  Query,
} from "tsoa";
import { ItemService } from "../../services/item-service";
import { provideSingleton, inject } from "../../middlewares/inversify/ioc-util";
import { ItemVO } from "../../types/vo";
import { ItemCreateParams, ItemUpdateParams } from "../../types/request";
import { getCustomRepository } from "typeorm";
import { ItemRepository } from "../../repositories/item-repository";

@Route("items")
@Tags("Item")
@provideSingleton(ItemController)
export class ItemController extends Controller {
  private itemRepository = getCustomRepository(ItemRepository);
  @inject(ItemService) private itemService: ItemService;

  @Get()
  @SuccessResponse(200, "Return Items")
  public get(): Promise<ItemVO[]> {
    return this.itemService.get();
  }

  @Get("count")
  @SuccessResponse(200, "Return Item Count")
  public count(@Request() req: any): Promise<number> {
    return this.itemRepository.count();
  }

  @Get("search")
  @SuccessResponse(200, "Return Items")
  public search(
    @Request() req: any,
    @Query() keyword = ""
  ): Promise<ItemVO[]> {
    return this.itemService.search(keyword);
  }

  @Get("{id}")
  @SuccessResponse(200, "Return Item")
  public find(@Request() req: any, id: string): Promise<ItemVO> {
    return this.itemService.find(id);
  }

  @Post()
  @SuccessResponse(200, "Return Item")
  public post(
    @Request() req: any,
    @Body() params: ItemCreateParams
  ): Promise<ItemVO> {
    return this.itemService.create(params);
  }

  @Put("{id}")
  @SuccessResponse(200, "Return Item")
  public put(
    @Request() req: any,
    id: string,
    @Body() params: ItemUpdateParams
  ): Promise<ItemVO> {
    return this.itemService.update(id, params);
  }

  @Delete("{id}")
  @SuccessResponse(204, "Succeeded")
  public async delete(@Request() req: any, id: string): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
