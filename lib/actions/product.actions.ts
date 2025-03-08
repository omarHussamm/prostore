'use server';
import { Product } from "@/types";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { prisma } from "@/db/prisma";

// Get latest products
export async function getLatestProducts(): Promise<Product[]> {
    const data = await prisma.product.findMany({ orderBy: { createdAt: 'desc' }, take: LATEST_PRODUCTS_LIMIT });
    return convertToPlainObject(data);
}

// Get product by slug
export async function getProductBySlug(slug: string): Promise<Product> {
    const data = await prisma.product.findFirst({ where: { slug } });
    if(data) return convertToPlainObject(data);
    throw new Error('Product not found');
}