import styled from "styled-components";

import Card from "./item.component";
import { Product } from "../../../interfaces/product";
import ItemContext from "./item-context";
import { useState } from "react";

interface ListOfItemsProps {
  items: Product[];
}

const ListOfItemsStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1.5em;
`;

const ListOfItems: React.FC<ListOfItemsProps> = ({ items }) => {
  if (items.length === 0) {
    return <div style={{ textAlign: "center" }}>No item found</div>;
  }
  return (
    <ListOfItemsStyled>
      {items.map((item: any) => {
        return <Card key={item.id} item={item} />;
      })}
    </ListOfItemsStyled>
  );
};

export default ListOfItems;
