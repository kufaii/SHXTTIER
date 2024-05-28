"use client";

import { ObjectId } from "mongodb";
interface WishlistButtonProps {
  objectId: ObjectId;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ objectId }) => {
  const addToWishlistHandler = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/wishlist`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: "follow", // manual, *follow, error
        body: JSON.stringify({ productId: objectId }), // body data type must match "Content-Type" header
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={addToWishlistHandler}>
      <div className="text-black text-sm mt-2">ADD TO WISHLIST</div>
    </button>
  );
};

export default WishlistButton;
