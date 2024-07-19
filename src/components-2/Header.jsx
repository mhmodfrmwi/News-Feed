import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { debounce } from "lodash";
import { useState } from "react";

const Header = (props) => {
  const { onCategoryChange, onSearchHandler } = props;
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    onCategoryChange(value);
  };

  const debouncedOnSearch = debounce((value) => {
    onSearchHandler(value);
    console.log(value);
  }, 500);
  return (
    <div className="flex justify-between gap-3 px-10 max-[426px]:flex-col">
      <Input
        type="text"
        placeholder="Search news"
        className="w-[280px] max-[426px]:w-full"
        onChange={(e) => debouncedOnSearch(e.target.value)}
      />
      <Select value={selectedCategory} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-[280px] max-[426px]:w-full">
          <SelectValue placeholder="Select a Newspaper" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="cnn">CNN</SelectItem>
            <SelectItem value="bbc-news">BBC News</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Header;
