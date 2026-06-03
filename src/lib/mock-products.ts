import type {Product} from "@/app/types/productTypes";
import {mockProducts} from "@/app/data/productData";

const products: Product[] = [...mockProducts];

export function getMockProducts() {
    return products;
}

export function getMockProduct(id: string) {
    return products.find((product) => product.uuid === id || String(product.id) === id) ?? null;
}

export function createMockProduct(payload: Partial<Product>) {
    const id = `${products.length + 1}`;
    const product: Product = {
        id,
        uuid: id,
        tittle: payload.tittle ?? "",
        image: payload.image ?? "",
        description: payload.description ?? "",
        price: Number(payload.price ?? 0),
        rating: Number(payload.rating ?? 0),
    };

    products.unshift(product);

    return product;
}
