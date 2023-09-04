import {
  CatalogImage,
  CatalogItem,
  CatalogItemVariation,
  CatalogObject,
  Client,
  Environment,
} from 'square';

export type CoreModel = {
  id: string;
  fetchedAt: number;
};

export type Item = CoreModel & CatalogItem;

export type ItemVariation = CoreModel & CatalogItemVariation;

export type Image = CoreModel & CatalogImage;

export type ProcessedCatalogObjects = {
  items: Item[];
  itemVariations: ItemVariation[];
  images: Image[];
};

export type FetchCatalogObjectParams = {
  id: string;
  includeRelatedObjects?: boolean;
};

export type FetchCatalogObjectsParams = {
  ids: string[];
  includeRelatedObjects?: boolean;
};

export type FetchCatalogParams = {
  include?: Array<'IMAGE' | 'ITEM_VARIATION'>;
};

export default class SquareService {
  private client;

  constructor() {
    this.client = new Client({
      accessToken: process.env.ACCESS_TOKEN,
      environment: Environment.Production,
    });
  }

  async fetchCatalogObject({
    id,
    includeRelatedObjects = true,
  }: FetchCatalogObjectParams): Promise<ProcessedCatalogObjects> {
    const objects: CatalogObject[] = [];
    try {
      const { result } = await this.client.catalogApi.retrieveCatalogObject(
        id,
        includeRelatedObjects
      );
      if (result.object) {
        objects.push(result.object);
      }
      if (result.relatedObjects) {
        objects.push(...result.relatedObjects);
      }
    } catch (error) {
      console.error('Unexpected error occurred: ', error);
    }
    return this.processCatalogObjects(objects);
  }

  async fetchCatalogObjects({
    ids,
    includeRelatedObjects = true,
  }: FetchCatalogObjectsParams): Promise<ProcessedCatalogObjects> {
    const objects: CatalogObject[] = [];
    try {
      const { result } =
        await this.client.catalogApi.batchRetrieveCatalogObjects({
          objectIds: ids,
          includeRelatedObjects,
        });
      if (result.objects) {
        objects.push(...result.objects);
      }
      if (result.relatedObjects) {
        objects.push(...result.relatedObjects);
      }
    } catch (error) {
      console.error('Unexpected error occurred: ', error);
    }
    return this.processCatalogObjects(objects);
  }

  async fetchCatalog({
    include = [],
  }: FetchCatalogParams = {}): Promise<ProcessedCatalogObjects> {
    const types = ['ITEM', ...include];
    const objects: CatalogObject[] = [];
    try {
      let cursor = undefined;
      do {
        const { result } = await this.client.catalogApi.listCatalog(
          cursor,
          types.join(',')
        );
        if (result.objects) {
          objects.push(...result.objects);
        }
        cursor = result.cursor;
      } while (cursor);
    } catch (error) {
      console.error('Unexpected error occurred: ', error);
    }

    return this.processCatalogObjects(objects);
  }

  private processCatalogObjects(
    objects: CatalogObject[]
  ): ProcessedCatalogObjects {
    const fetchedAt = Date.now();
    const items: Item[] = [];
    const images: Image[] = [];
    const itemVariations: ItemVariation[] = [];
    objects.forEach((object) => {
      switch (object.type) {
        case 'ITEM':
          if (object.itemData) {
            items.push({
              ...object.itemData,
              id: object.id,
              fetchedAt,
            });
          }
          break;
        case 'IMAGE':
          if (object.imageData) {
            images.push({ ...object.imageData, id: object.id, fetchedAt });
          }
          break;
        case 'ITEM_VARIATION':
          if (object.itemVariationData) {
            itemVariations.push({
              ...object.itemVariationData,
              id: object.id,
              fetchedAt,
            });
          }
      }
    });

    return { items, itemVariations, images };
  }
}
