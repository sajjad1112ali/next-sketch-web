import { Menu } from "@headlessui/react";
import Image from "next/image";
type Props = {
  title: string;
  state: string;
  filters: Array<string>;
  setState: (value: string) => void;
};
const CategoriesDD = ({ title, state, filters, setState }: Props) => {
  return (
    <div className="flexStart flex-col w-full gap-7 relative">
      <label htmlFor={title} className="w-full text-gray-100">
        {title}
      </label>
      <Menu as="div" className="self-start relative">
        <div>
          <Menu.Button className="flexCenter custom_menu-btn">
            {state || "Select a category"}
            <Image
              src="/down-arrow.svg"
              width={10}
              height={10}
              alt="Arrow down"
            />
          </Menu.Button>
          <Menu.Items className="flexStart custom_menu-items">
            {filters.map((category) => (
              <Menu.Item key={category}>
                <button
                  type="button"
                  value={category}
                  className="custom_menu-item"
                  onClick={(e) => setState(e.currentTarget.value)}
                >
                  {category}
                </button>
              </Menu.Item>
            ))}
          </Menu.Items>
        </div>
      </Menu>
    </div>
  );
};

export default CategoriesDD;
