import { useContext } from "react";
import ItemContext, { ItemContextProps } from "./item-context";

const useItem = (itemId: string) => {
  const { isInBucketList, isInWishList } =
    useContext<ItemContextProps>(ItemContext);

  const isItemInBucketList = isInBucketList(itemId);
  const isItemInWishList = isInWishList(itemId);

  return {
    isItemInBucketList,
    isItemInWishList
  };
};

export default useItem;
