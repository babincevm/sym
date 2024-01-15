import { supabase } from '@/database';

import { ICreateProduct, IProduct } from '@/store/products/types';
import { IPaginated } from '@/api/types';
import { TSortShape, TWithSignal } from '@/types/types';
import { IProductsFilters } from '@/api/types/products';

interface IFetchArgs {
    page?: number;
    pageSize?: number;
    search?: string;
    sort?: TSortShape;
    filter?: IProductsFilters;
}

interface IProductAPI {
    fetchProducts: (args: IFetchArgs) => Promise<IPaginated<IProduct[]>>;
    createProduct: (product: Omit<IProduct, 'id' | 'isExternalCreate' | 'dateCreated'>) => Promise<IProduct>;
}

class ProductAPI implements IProductAPI {
    // eslint-disable-next-line @typescript-eslint/typedef
    private TABLE_NAME = 'Products' as const;

    private setQueryFilters(query: unknown, filters: IProductsFilters): void {
        if (filters.title) {
            // @ts-ignore
            query.ilike('title', `%${filters.title}%`);
        }
        if (filters.price?.min !== undefined) {
            // @ts-ignore
            query.gt('price', filters.price.min);
        }
        if (filters.price?.max !== undefined) {
            // @ts-ignore
            query.lt('price', filters.price.max);
        }
        if (filters.isPublished !== undefined) {
            // @ts-ignore
            query.is('isPublished', filters.isPublished);
        }
        if (filters.isExternalCreated !== undefined) {
            // @ts-ignore
            query.is('isExternalCreated', filters.isExternalCreated);
        }
    }

    public async fetchProducts(
        args: TWithSignal<IFetchArgs> = {},
        skipPagination: boolean = false
    ): Promise<IPaginated<IProduct[]>> {
        const response: IPaginated<IProduct[]> = { data: [] };

        const query = supabase.from(this.TABLE_NAME).select('*');

        if (!skipPagination && (args.filter || args.page)) {
            const countQuery = supabase.from(this.TABLE_NAME).select(`id`, { count: 'exact' }).limit(1);
            if (args.signal) {
                countQuery.abortSignal(args.signal);
            }
            if (args.filter) {
                this.setQueryFilters(countQuery, args.filter);
            }
            const { count } = await countQuery;
            response.meta = {
                count: count ?? 0
            };
        }

        if (args.pageSize && args.page) {
            query.range((args.page - 1) * args.pageSize, args.page * args.pageSize - 1);
        }
        if (args.sort) {
            const [sortField, sortOrder] = args.sort.split('.');
            query.order(sortField, { ascending: sortOrder === 'asc' });
        } else {
            query.order('created_at', { ascending: false });
        }
        if (args.filter) {
            this.setQueryFilters(query, args.filter);
        }
        if (args.signal) {
            query.abortSignal(args.signal);
        }
        if (args.search) {
            this.setQueryFilters(query, {
                title: args.search
            });
        }
        const { data, error } = await query;
        if (error !== null) {
            throw error;
        }
        response.data = (data ?? []) as unknown as IProduct[];
        return response;
    }

    public async fetchProduct(id: IProduct['id']): Promise<IProduct | undefined> {
        const { data, error } = await supabase.from(this.TABLE_NAME).select('*').eq('id', id);
        if (error !== null) {
            throw error;
        }
        if (!data) {
            return undefined;
        }
        return data[0] as unknown as IProduct;
    }

    public async createProduct(product: ICreateProduct): Promise<IProduct> {
        const { data, error } = await supabase
            .from(this.TABLE_NAME)
            .insert({
                title: product.title,
                price: product.price,
                description: product.description,
                image: product.image,
                isPublished: product.isPublished,
                isExternalCreated: true
            })
            .select();
        if (error !== null) {
            throw error;
        }
        return data[0] as unknown as IProduct;
    }

    public async updateProduct(
        productId: IProduct['id'],
        product: Partial<Omit<IProduct, 'id' | 'isExternalCreate' | 'dateCreated'>>
    ): Promise<IProduct> {
        const currentProduct = await this.fetchProduct(productId);
        if (currentProduct === undefined) {
            throw new Error('Error');
        }
        const fieldsToUpdate = {
            ...product
        };
        Object.keys(product).forEach((key: string) => {
            if (product[key as keyof typeof product] === currentProduct[key as keyof typeof product]) {
                delete fieldsToUpdate[key as keyof typeof product];
            }
        });
        const { data, error } = await supabase
            .from(this.TABLE_NAME)
            .update(fieldsToUpdate)
            .eq('id', productId)
            .select();

        if (error !== null) {
            throw error;
        }
        return data[0] as unknown as IProduct;
    }

    public async deleteProduct(id: IProduct['id']): Promise<boolean> {
        const { error } = await supabase.from(this.TABLE_NAME).delete().eq('id', id);

        return error === null;
    }
}

export default new ProductAPI();
