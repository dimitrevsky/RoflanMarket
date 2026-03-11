export interface Product {
    id: number
    title: string
    description: string
    price: number
    rating: number
    category?: string
    images?: string[]
    thumbnail?: string
    discountPercentage?: number
    stock?: number
    tags?: string[]
    reviews?: string[]
}