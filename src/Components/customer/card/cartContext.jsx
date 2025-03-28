import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [search, setSearch] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [count, setCount] = useState(0);

    // Load cart items from localStorage on initialization
    useEffect(() => {
        const storedCart = localStorage.getItem("cartItems");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart)); // Load from localStorage
        }
    }, []); // Runs only once when the component mounts

    // Save cart items to localStorage whenever cartItems changes
    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Save cart to localStorage
        }
        setCount(cartItems.length); // Update item count based on cart items
    }, [cartItems]); // Runs whenever cartItems changes

    // Check if the product is in the cart
    const isInCart = (productId) => cartItems.some((item) => item._id === productId);

    // Add a product to the cart
    const addToCart = (product, quantity) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item._id === product._id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                return [...prevItems, { ...product, quantity }];
            }
        });
    };

    // Remove a product from the cart and localStorage
    const removeFromCart = (productId) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.filter((item) => item._id !== productId); // Remove from state
            localStorage.setItem("cartItems", JSON.stringify(updatedItems)); // Update localStorage
            return updatedItems; // Update the state with new cart items
        });
    };

    // Update the quantity of a specific product in the cart
    const updateCartItemQuantity = (productId, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item._id === productId ? { ...item, quantity } : item
            )
        );
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateCartItemQuantity,
                isInCart,
                count,
                setSearch,
                search,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
