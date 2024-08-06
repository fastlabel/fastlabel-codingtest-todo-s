import { EntityRepository, Repository } from "typeorm";
import { ItemDto } from "../dtos/item-dto";
import { Item } from "../entities/item";

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  async findByIdOrFail(id: string): Promise<ItemDto> {
    const query = this.createQueryBuilder("items").where("items.id = :id", {
      id,
    });
    return ItemDto.fromEntity(await query.getOneOrFail());
  }

  async findLastByOrder(): Promise<ItemDto | undefined> {
    const entity = await this.createQueryBuilder("items")
      .orderBy("items.order", "DESC")
      .getOne();
    if (!entity) return undefined;
    return ItemDto.fromEntity(entity);
  }

  async get(): Promise<ItemDto[]> {
    let entities = await this.createQueryBuilder("items")
      .orderBy("items.order", "ASC")
      .getMany();
    const results = [] as any;
    entities.forEach((e) => {
      results.push(ItemDto.fromEntity(e));
    });
    return results;
  }

  async search(keyword: string): Promise<ItemDto[]> {
    const results = await this.createQueryBuilder("items")
      .where("items.content LIKE :keyword", { keyword: `%${keyword}%` })
      .orderBy("items.order", "ASC")
      .getMany();
    return results.map((e) => ItemDto.fromEntity(e));
  }
}
