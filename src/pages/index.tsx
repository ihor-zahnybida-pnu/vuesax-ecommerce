import styled from "styled-components";
import useSWR from "swr";
import { Heart, ShoppingCart } from "./../components/icons";
import Button from "../components/button.component";
import Container from "./../components/layout/layout/container/container.component";
import Sidebar from "./../components/templates/sidebar.component";
import Page from "./../components/layout/page/page";
import ButtonGroup from "./../components/button-group.component";
import Search from "./../components/search.component";
import { useState } from "react";
import ListOfItems from "@/components/templates/items/list-of-items.component";
import { Item } from "@/interfaces/Item";
import { useRouter } from "next/router";

const IndexStyled = styled.div`
  padding-block-start: 0.7em;
  .search-container {
    margin-block-end: 1em;
  }
`;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Index = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const { data, error, isLoading } = useSWR<Item[]>("/api/items", fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <Page
      content={
        <Container>
          <IndexStyled>
            <Title>
              <div>
                {data.length} result {data.length > 1 ? "s" : ""} found
              </div>
              <ButtonGroup>
                <Button
                  type="iconOnly"
                  icon={
                    <ShoppingCart
                      width={"20px"}
                      height={"15px"}
                      color="white"
                    />
                  }
                  color="#0b75c0"
                  onClick={() => router.push("/basket")}
                />
                <Button
                  type="iconOnly"
                  icon={<Heart width={"20px"} height={"15px"} color="white" />}
                  color="#0b75c0"
                  onClick={() => router.push("/wishes")}
                />
              </ButtonGroup>
            </Title>

            <Search
              value={search}
              onValueChanged={(value) => setSearch((prev) => (prev = value))}
            />

            <ListOfItems items={searchItems(data, search)} />
          </IndexStyled>
        </Container>
      }
      sidebar={<Sidebar />}
    />
  );
};

export default Index;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-block-end: 1em;
`;

const searchItems = (items: Item[], query: string): Item[] => {
  return items.filter((item) => {
    return ["name", "description"].some((newItem) => {
      return (
        (item as any)[newItem]
          .toString()
          .toLowerCase()
          .indexOf(query.toLowerCase()) > -1
      );
    });
  });
};
