export interface Flavor {
    id: string;
    name: string;
    description: string;
    fullDetails: string;
    color: string;
    secondaryColor: string;
    image: string;
    price: number;
}

export const flavors: Flavor[] = [
    {
        id: "mango",
        name: "Classic Mango",
        description: "The original Maza experience, made from the finest hand-picked mangoes.",
        fullDetails: "Experience the rich, velvety taste of our Classic Mango juice. Sourced from the best Alphonso and Kesar mangoes, every sip is a burst of tropical sunshine. Perfectly balanced sweetness and a smooth texture make it the ultimate thirst quencher.",
        color: "#FFB800",
        secondaryColor: "#FF7A00",
        image: "https://images.unsplash.com/photo-1622597467836-f3285f2127fd?q=80&w=800",
        price: 15.99,
    },
    {
        id: "guava",
        name: "Pink Guava",
        description: "A unique, exotic blend of sweet and tangy pink guavas.",
        fullDetails: "Our Pink Guava juice brings the exotic flavor of the tropics to your glass. Known for its distinct aroma and refreshing taste, pink guava is packed with Vitamin C and natural antioxidants. It's thick, creamy, and absolutely delicious.",
        color: "#FF8E9E",
        secondaryColor: "#E04C63",
        image: "https://images.unsplash.com/photo-1546173159-315144b611e9?q=80&w=800",
        price: 16.99,
    },
    {
        id: "litchi",
        name: "Luscious Litchi",
        description: "Delicate, sweet, and incredibly refreshing litchi juice.",
        fullDetails: "Discover the delicate sweetness of our Luscious Litchi. This refreshing juice captures the essence of summer with its floral notes and hydrating properties. Light on the palate and sophisticated in flavor, it's a favorite for all ages.",
        color: "#FFFFFF",
        secondaryColor: "#D6D6D6",
        image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?q=80&w=800",
        price: 17.99,
    },
    {
        id: "mixed-fruit",
        name: "Mixed Fruit Bliss",
        description: "A powerhouse of nutrition with a blend of seven tropical fruits.",
        fullDetails: "Mixed Fruit Bliss is a nutritional powerhouse. We've combined mango, guava, pineapple, orange, apple, and more to create a symphony of flavors. It's the perfect way to get your daily dose of fruit in one delicious drink.",
        color: "#FFA500",
        secondaryColor: "#FF4500",
        image: "https://images.unsplash.com/photo-1621506289937-48e462774870?q=80&w=800",
        price: 18.99,
    },
];
