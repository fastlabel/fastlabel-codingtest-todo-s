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
import { validate, ValidationError } from "class-validator";

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
    const dto = new ItemDto(uuid(), await this.getNextOrder(), params.content, params.isDone);
    const entity = dto.toEntity();
    const errors: ValidationError[] = await validate(entity);
    if (errors.length > 0) {
      const message = this.validationErrorMessages(errors).join(", ");
      throw new ClientError(ClientErrorStatusCodes.UNPROCESSABLE_ENTITY, message);
    }
    await this.itemRepository.save(entity);
    return dto.toVO();
  }

  async update(id: string, params: ItemUpdateParams): Promise<ItemVO> {
    const dto = await this.itemRepository.findByIdOrFail(id);
    if (params.order) dto.order = params.order;
    if (params.content) dto.content = params.content;
    if (params.isDone) dto.isDone = params.isDone;
    await this.itemRepository.save(dto);
    return dto.toVO();
  }

  async getNextOrder(): Promise<number> {
    const lastItem = await this.itemRepository.findLastByOrder();
    return lastItem ? lastItem.order + 1 : 1;
  }

  validationErrorMessages(errors: ValidationError[]): string[] {
    return errors
      .map((error) => Object.values(error.constraints as any) as string[])
      .reduce((acc, cur) => acc.concat(cur), []);
  }
}
