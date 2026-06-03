import {Metadata} from "next";
import ProductDetail from "@/app/product/[id]/productdetail";
import type {Product} from "@/app/types/productTypes";
import {mockProducts} from "@/app/data/productData";

function getMockProduct(id: string) {
    return mockProducts.find((product) => product.uuid === id || String(product.id) === id) ?? null;
}

function getApiProductUrl(id: string) {
    const apiBaseUrl = process.env.AUTHGATE_API_BASE_URL ?? process.env.NEXT_PUBLIC_AUTHGATE_API_BASE_URL;

    if (!apiBaseUrl) {
        return null;
    }

    const baseUrl = apiBaseUrl.endsWith("/") ? apiBaseUrl : `${apiBaseUrl}/`;

    return new URL(`product/${id}`, baseUrl);
}

function getProductMetadata(product: Product): Metadata {
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
}

export async function generateMetadata(props: any): Promise<Metadata> {
    const {id} = await props.params;
    const fallbackProduct = getMockProduct(id);
    const productUrl = getApiProductUrl(id);

    if (productUrl) {
        try {
            const res = await fetch(productUrl);

            if (res.ok) {
                const product: Product = await res.json();
                return getProductMetadata(product);
            }
        } catch {
            // Fall back to local product metadata when AuthGate/backend is unavailable.
        }
    }

    return fallbackProduct ? getProductMetadata(fallbackProduct) : {title: "Product not found"};
}

export default function Page() {
    return (
        <ProductDetail/>
    )
}
