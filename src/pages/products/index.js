import fs from "fs";
import path from "path";
import process from "process";

import Link from "next/link";

function ProductsPage(props) {
  const { products } = props;
  return (
    <div>
      <h1>Ini adalah Product Page</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  console.log("Regenerate");
  const filePath = path.join(process.cwd(), "data", "dummy.json");
  const data = await fs.promises.readFile(filePath);
  const productData = JSON.parse(data);

  if (productData.products.length === 0) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {
      products: productData.products,
    },
    revalidate: 10,
  };
}

export default ProductsPage;
