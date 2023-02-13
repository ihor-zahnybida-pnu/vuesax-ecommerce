import styled from "styled-components";

import Card from "./item.component";
import { Item } from "../../../interfaces/Item";

interface ListOfItemsProps {
  items: Item[];
}

const ListOfItemsStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1.5em;
`;

const ListOfItems: React.FC<ListOfItemsProps> = ({ items }) => {
  if (items.length === 0) {
    return <div style={{textAlign: 'center'}}>No item found</div>
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
