import useSWR from "swr";
import { Product } from "@/interfaces/product";
import { Keys } from "@/interfaces/keys";
import useLocalStorage from "@/utilities/use-local-storage";
import styled from "styled-components";
import Button from "@/components/button.component";
import { useRouter } from "next/router";
import Container from "@/components/layout/layout/container/container.component";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const WishesStyled = styled.div`
  width: 100%;
  table,
  th,
  td {
    border: 1px solid;
  }
  th,
  td {
    padding: .5em;
  }
  table {
    margin: 0 auto;
    width: 80%;
  }
`;
const Wishes = () => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR<Product[]>("/api/wishes", fetcher);

  const [storedWishes] = useLocalStorage<string[]>(Keys.WISHES, []);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <Container>
      <WishesStyled>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
          <h1>Wishes</h1>
          <Button
            type={"textOnly"}
            title="Products"
            onClick={() => router.push("/")}
          />
        </div>
        <table>
          <tr>
            <th>#</th>
            <th>title</th>
            <th>brand</th>
            <th>category</th>
            <th>price</th>
            <th>rating</th>
          </tr>
          {getProducts(data, storedWishes).map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{index}</td>
                <td>{item.title}</td>
                <td>{item.brand}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>{item.rating ?? " - "}</td>
              </tr>
            );
          })}
        </table>
      </WishesStyled>
    </Container>
  );
};
export default Wishes;

const getProducts = (data: Product[], storedWishes: string[]): Product[] => {
  const res: Product[] = [];
  storedWishes.forEach((id) => {
    const findItem = data.find((i) => i.id === id);
    if (findItem) {
      res.push(findItem);
    }
  });
  return res;
};
