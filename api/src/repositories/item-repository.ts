import { EntityRepository, Repository } from "typeorm";
import { ItemDto } from "../dtos/item-dto";
import { Item } from "../entities/item";

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  async findByIdOrFail(id: string): Promise<ItemDto> {
    const query = this.createQueryBuilder("items")
      .where("items.id = :id", { id });
    const entity = await query.getOneOrFail();
    return ItemDto.fromEntity(entity);
  }

  async findLastByOrder(): Promise<ItemDto | undefined> {
    const query = this.createQueryBuilder("items")
      .orderBy("items.order", "DESC");
    const entity = await query.getOne();
    if (!entity) return undefined;
    return ItemDto.fromEntity(entity);
  }

  async get(): Promise<ItemDto[]> {
    const query = this.createQueryBuilder("items")
      .orderBy("items.order", "ASC")
    const entities = await query.getMany();
    return entities.map((entity) => ItemDto.fromEntity(entity));
  }

  async search(keyword: string): Promise<ItemDto[]> {
    const query = this.createQueryBuilder("items")
      .where("items.content LIKE :keyword", { keyword: `%${keyword}%` })
      .orderBy("items.order", "ASC")
    const entities = await query.getMany();
    return entities.map((entity) => ItemDto.fromEntity(entity));
  }
}
