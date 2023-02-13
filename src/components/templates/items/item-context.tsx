import { createContext } from 'react';

export interface ItemContextProps {
  isInBucketList: (id: string) => boolean;
  addItemToBucket: (id: string) => void;
  removeItemFromBucket: (id: string) => void;
  isInWishList: (id: string) => boolean;
  addItemToWishes: (id: string) => void;
  removeItemFromWishes: (id: string) => void;
}

const ItemContext = createContext<ItemContextProps>({
  isInBucketList: (id) => false,
  addItemToBucket: console.log,
  removeItemFromBucket: console.log,
  isInWishList: (id) => false,
  addItemToWishes: console.log,
  removeItemFromWishes: console.log,
});

export default ItemContext;
