import {Metadata} from "next";
import ProductDetail from "@/app/product/[id]/productdetail";
import type {Product} from "@/app/types/productTypes";
import {getBackendUrl} from "@/lib/backend";
import {getMockProduct} from "@/lib/mock-products";

export async function generateMetadata(props: any): Promise<Metadata> {
    const {id} = await props.params;
    const fallbackProduct = getMockProduct(id);

    try {
        const res = await fetch(getBackendUrl(["product", id]));
        if (!res.ok) {
            if (fallbackProduct) {
                return {
                    title: fallbackProduct.tittle,
                    description: fallbackProduct.description,
                    openGraph: {
                        title: fallbackProduct.tittle,
                        description: fallbackProduct.description,
                        images: [{url: fallbackProduct.image, width: 600, height: 400}],
                        type: "website",
                    },
                };
            }

            return {title: 'Product not found'};
        }

        const product: Product = await res.json();
        return {
            title: product.tittle,
            description: product.description,
            openGraph: {
                title: product.tittle,
                description: product.description,
                images: [{url: product.image, width: 600, height: 400}],
                type: "website",
            },
        };
    } catch {
        if (fallbackProduct) {
            return {
                title: fallbackProduct.tittle,
                description: fallbackProduct.description,
                openGraph: {
                    title: fallbackProduct.tittle,
                    description: fallbackProduct.description,
                    images: [{url: fallbackProduct.image, width: 600, height: 400}],
                    type: "website",
                },
            };
        }

        return {
            title: 'Product not found',
        };
    }
}

export default function Page() {
    return (
        <ProductDetail/>
    )
}
