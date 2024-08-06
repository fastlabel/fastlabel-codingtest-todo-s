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
    return dtos.map((dto) => dto.toVO());
  }

  async find(id: string): Promise<ItemVO> {
    const dto = await this.itemRepository.findByIdOrFail(id);
    return dto.toVO();
  }

  async search(keyword: string): Promise<ItemVO[]> {
    const dtos = await this.itemRepository.search(keyword);
    return dtos.map((dto) => dto.toVO());
  }

  async create(params: ItemCreateParams): Promise<ItemVO> {
    if (await this.isUpToLimit()) {
      const message = `Todo count is up to ${TODO_LIMIT_COUNT}.`;
      throw new ClientError(ClientErrorStatusCodes.UNPROCESSABLE_ENTITY, message);
    }
    const item = new ItemDto(uuid(), await this.getNextOrder(), params.content, params.isDone);
    await this.itemRepository.save(item.toEntity());
    return item.toVO();
  }

  async update(id: string, params: ItemUpdateParams): Promise<ItemVO> {
    const dto = await this.itemRepository.findByIdOrFail(id);
    if (params.order) dto.order = params.order;
    if (params.content) dto.content = params.content;
    if (params.isDone) dto.isDone = params.isDone;
    await this.itemRepository.save(dto);
    return dto.toVO();
  }

  async isUpToLimit(): Promise<boolean> {
    const count = await this.itemRepository.count();
    return count >= TODO_LIMIT_COUNT;
  }

  async getNextOrder(): Promise<number> {
    const lastItem = await this.itemRepository.findLastByOrder();
    return lastItem ? lastItem.order + 1 : 1;
  }
}
