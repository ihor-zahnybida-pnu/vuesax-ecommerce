import styled from "styled-components";
import useSWR from "swr";
import { Heart, ShoppingCart } from "./../components/icons";
import Button from "../components/button.component";
import Container from "./../components/layout/layout/container/container.component";
import Sidebar from "./../components/templates/sidebar.component";
import Page from "./../components/layout/page/page";
import ButtonGroup from "./../components/button-group.component";
import Search from "./../components/search.component";
import { useMemo, useState } from "react";
import ListOfItems from "@/components/templates/items/list-of-items.component";
import { Product } from "@/interfaces/product";
import { useRouter } from "next/router";
import ItemContext from "@/components/templates/items/item-context";
import useLocalStorage from "@/utilities/use-local-storage";
import { Keys } from "@/interfaces/keys";
import Pagination from "@/components/pagination/pagination";

const ITEMS_PER_PAGE = 9;

const IndexStyled = styled.div`
  padding-block-start: 0.7em;
  .search-container {
    margin-block-end: 1em;
  }
`;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Index = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<
    { property: string; value: string; forceClear?: boolean }[]
  >([]);

  const handleFilterChanges = (filter: any) => {
    if (filter.forceClear) {
      setFilters((prev) => (prev = []));
      setCurrentPage((prev) => (prev = 1));
      return;
    }

    if (filterApplied(filters, filter)) {
      setFilters(
        (prev) => (prev = prev.filter((x) => x.value !== filter.value))
      );
    } else {
      setFilters((prev) => (prev = [...prev, filter]));
    }
    setCurrentPage((prev) => (prev = 1));
  };

  const [storedBucket, setStoredBucket] = useLocalStorage<string[]>(
    Keys.BUCKETS,
    []
  );
  const [storedWishes, setStoredWishes] = useLocalStorage<string[]>(
    Keys.WISHES,
    []
  );
  const { data, error, isLoading } = useSWR<{
    products: Product[];
    categories: string[];
    brands: string[];
  }>("/api/items", fetcher);

  const values = useMemo(
    () => searchItems(data?.products, search, filters),
    [data?.products, search, filters]
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  const handlePageChanges = (page: number): void => {
    setCurrentPage((prev) => (prev = page));
  };

  return (
    <ItemContext.Provider
      value={{
        isInBucketList: (id: string) => storedBucket.indexOf(id) > -1,
        addItemToBucket: (id: string) =>
          setStoredBucket((prev) => {
            return prev ? (prev = [...prev, id]) : [];
          }),
        removeItemFromBucket: (id: string) =>
          setStoredBucket((prev) => {
            return prev ? (prev = prev.filter((x) => x !== id)) : [];
          }),
        isInWishList: (id: string) => storedWishes.indexOf(id) > -1,
        addItemToWishes: (id: string) =>
          setStoredWishes((prev) => {
            return prev ? (prev = [...prev, id]) : [];
          }),
        removeItemFromWishes: (id: string) =>
          setStoredWishes((prev) => {
            return prev ? (prev = prev.filter((x) => x !== id)) : [];
          }),
      }}
    >
      <Page
        content={
          <Container>
            <IndexStyled>
              <Title>
                <div>{values.length} results found</div>
                <ButtonGroup>
                  <Button
                    type="iconLeft"
                    icon={
                      <ShoppingCart
                        width={"20px"}
                        height={"15px"}
                        color="white"
                      />
                    }
                    title={`${storedBucket.length}`}
                    background="#0b75c0"
                    color="white"
                    onClick={() => router.push("/bucket")}
                  />
                  <Button
                    type="iconLeft"
                    title={`${storedWishes.length}`}
                    icon={
                      <Heart width={"20px"} height={"15px"} color="white" />
                    }
                    background="#0b75c0"
                    color="white"
                    onClick={() => router.push("/wishes")}
                  />
                </ButtonGroup>
              </Title>

              <Search
                value={search}
                onValueChanged={(value) => {
                  setSearch((prev) => (prev = value));
                  setCurrentPage((prev) => (prev = 1));
                }}
              />

              <ListOfItems
                items={values.slice(
                  (currentPage - 1) * ITEMS_PER_PAGE,
                  ITEMS_PER_PAGE * currentPage
                )}
              />

              {values.length > ITEMS_PER_PAGE && (
                <Pagination
                  currentPage={currentPage}
                  totalCount={Math.ceil(values.length / ITEMS_PER_PAGE)}
                  onPageChange={handlePageChanges}
                />
              )}
            </IndexStyled>
          </Container>
        }
        sidebar={
          <Sidebar
            categories={data.categories}
            brands={data.brands}
            values={values}
            setFilters={handleFilterChanges}
            itemFilters={filters}
          />
        }
      />
    </ItemContext.Provider>
  );
};

export default Index;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-block-end: 1em;
`;

const searchItems = (
  items: Product[] = [],
  query: string,
  filters: any
): Product[] => {
  return items
    .filter((item) => {
      return ["title", "brand"].some((newItem) => {
        return (
          (item as any)[newItem]
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        );
      });
    })
    .filter((item) => {
      if (filters.length === 0) {
        return true;
      } else
        return [...filters].some((newItem) => {
          return (
            (item as any)[newItem.property]
              .toString()
              .replace("-", "")
              .toLowerCase()
              .indexOf(newItem.value.replace(" ", "_").toLowerCase()) > -1
          );
        });
    });
};

const filterApplied = (
  filters: { property: string; value: string }[],
  filter: { property: string; value: string }
): boolean => {
  return filters.some((f) => f.value === filter.value);
};
