import { fetchUsers } from "../external/fetch";
import Image from "next/image";

interface Product {
  code: string;
  product_name?: string;
  image_url?: string;
  nutriments?: {
    energy?: number;
  };
}

export default async function UserList() {
  const users = await fetchUsers();

  return (
    <div className="liquid-glass p-6 rounded-xl w-full">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Liste des produits
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.products?.map((product: Product) => (
          <div key={product.code} className="liquid-glass p-4 rounded-lg text-center">
            <h3 className="font-semibold text-lg mb-2">{product.product_name || 'Produit sans nom'}</h3>
            <p className="text-sm opacity-70 mb-3">Code: {product.code}</p>
            {product.image_url && (
              <div className="flex justify-center mb-3">
                <Image 
                  src={product.image_url} 
                  alt={product.product_name || 'Produit'} 
                  width={120}
                  height={120}
                  className="object-cover rounded-lg"
                />
              </div>
            )}
            {product.nutriments?.energy && (
              <p className="text-xs opacity-60 mt-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent font-medium">
                🔥 Énergie: {product.nutriments.energy} kJ
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
