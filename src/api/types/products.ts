export interface IProductsFilters {
    price?: {
        min?: number;
        max?: number;
    };
    title?: string;
    isPublished?: boolean;
    isExternalCreated?: boolean;
}
