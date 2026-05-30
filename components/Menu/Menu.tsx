/**
 * Menu Component
 * 
 * Displays the coffee shop menu with a grid of menu items.
 * Features:
 * - Grid layout: 1 column on mobile, 2 columns on desktop
 * - 10 menu items displayed
 * - Section header with title and separator
 * - Call-to-action button
 */

import Link from "next/link";
import Separator from "../Separator";
import MenuItem from "./MenuItem";
import { menuItems } from "@/src/data/menu";

const Menu = () => {
  // Show first 10 items for the home page menu
  const displayItems = menuItems.slice(0, 10);

  return (
    <section className="pt-12 pb-16 xl:pt-16 xl:pb-36">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-12 xl:mb-24">
          <h2 className="h2 text-center">Our Menu</h2>
          <div className="mb-4">
            <Separator bg="accent" />
          </div>
          {/* Section Description */}
          <p className="text-center max-w-[620px] mx-auto">
            Experience our hand-crafted selections. Every cup and plate is prepared with fresh ingredients and artisanal passion.
          </p>
        </div>
        
        {/* Menu Grid and Button */}
        <div className="flex flex-col items-center gap-12 xl:gap-24">
          {/* Menu Items Grid - Responsive: 1 column mobile, 2 columns desktop */}
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-y-8 gap-x-16 place-content-center">
            {displayItems.map((item, index) => {
              const { name, description, price, image } = item;
              return (
                <MenuItem
                  key={index}
                  name={name}
                  description={description}
                  price={price}
                  imgSrc={image}
                />
              );
            })}
          </div>
          {/* Call-to-Action Button */}
          <Link href="/menu">
            <button type="button" className="btn">View full menu</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Menu;
