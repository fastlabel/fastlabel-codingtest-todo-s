import { getCustomRepository } from "typeorm";
import { ItemDto } from "../dtos/item-dto";
import { provideSingleton } from "../middlewares/inversify/ioc-util";
import { ItemRepository } from "../repositories/item-repository";
import { ItemCreateParams, ItemUpdateParams } from "../types/request";
import { ItemVO } from "../types/vo";
import { v4 as uuid } from "uuid";
import {
  ClientError,
  ClientErrorStatusCodes,
} from "../middlewares/client-error";

const TODO_LIMIT_COUNT: number = 10;

@provideSingleton(ItemService)
export class ItemService {
  private itemRepository: ItemRepository;

  constructor() {
    this.itemRepository = getCustomRepository(ItemRepository);
  }

  async get(): Promise<ItemVO[]> {
    const dtos = await this.itemRepository.get();
    const results = [] as any;
    dtos.forEach((d) => {
      results.push(d.toVO());
    });
    return results;
  }

  async find(id: string): Promise<ItemVO> {
    const dto = await this.itemRepository.findByIdOrFail(id);
    return dto.toVO();
  }

  async search(keyword: string): Promise<ItemVO[]> {
    const dtos = await this.itemRepository.search(keyword);
    return dtos.map((d) => d.toVO());
  }

  async create(params: ItemCreateParams): Promise<ItemVO> {
    const r = this.itemRepository;
    if ((await r.count()) >= TODO_LIMIT_COUNT) {
      throw new ClientError(
        ClientErrorStatusCodes.UNPROCESSABLE_ENTITY,
        `Todo count is up to ${TODO_LIMIT_COUNT}.`
      );
    }
    const item1 = await r.findLastByOrder();
    const order = item1 ? item1.order + 1 : 1;
    const item2 = new ItemDto(uuid(), order, params.content, params.isDone);
    await r.save(item2.toEntity());
    return item2.toVO();
  }

  async update(id: string, params: ItemUpdateParams): Promise<ItemVO> {
    const dto = await this.itemRepository.findByIdOrFail(id);
    if (params.order) dto.order = params.order;
    if (params.content) dto.content = params.content;
    if (params.isDone) dto.isDone = params.isDone;
    await this.itemRepository.save(dto);
    return dto.toVO();
  }
}
