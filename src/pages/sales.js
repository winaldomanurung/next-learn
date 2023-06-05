import { useEffect, useState } from "react";

import styles from "./sales.module.css";

function SalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  useEffect(() => {
    fetch("https://next-backend-7773b-default-rtdb.firebaseio.com/sales.json")
      .then((response) => response.json())
      .then((data) => {
        const salesInArray = [];
        for (const key in data) {
          salesInArray.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        console.log(salesInArray);
        setSales(salesInArray);
      });
  }, []);

  if (!sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul className={styles["list-styling"]}>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://next-backend-7773b-default-rtdb.firebaseio.com/sales.json"
  );

  const data = await response.json();

  const salesInArray = [];
  for (const key in data) {
    salesInArray.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }
  return { props: { sales: salesInArray } };
}

export default SalesPage;
