import fs from "fs";
import path from "path";
import process from "process";

function ProductDetail(props) {
  const { loadedProduct } = props;

  console.log(loadedProduct);

  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </div>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy.json");
  const data = await fs.promises.readFile(filePath);
  const productData = JSON.parse(data);

  return productData;
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.productid;

  const productData = await getData();

  const productDetail = productData.products.find(
    (product) => product.id === productId
  );

  if (!productDetail) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      loadedProduct: productDetail,
    },
  };
}

export async function getStaticPaths() {
  const productData = await getData();

  const ids = productData.products.map((product) => product.id);
  console.log(ids);

  // [ { params: { productid: "p1" } },
  //   { params: { productid: "p1" } },
  //   { params: { productid: "p1" } }
  // ]

  const params = ids.map((id) => ({ params: { productid: id } }));
  console.log(params);

  return {
    paths: params,
    fallback: true,
  };
}

export default ProductDetail;
