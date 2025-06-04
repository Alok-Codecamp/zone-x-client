import { useEffect, useState } from "react";

const Shop = () => {
    const [shopName, setShopName] = useState<string>("");

    useEffect(() => {
        const host = window.location.hostname;
        const parts = host.split('.');

        const subdomain = parts.length > 0 ? parts[0] : "";

        setShopName(subdomain);
    }, []);

    return (
        <div>
            <h1>This is {shopName} shop</h1>
        </div>
    );
}

export default Shop;