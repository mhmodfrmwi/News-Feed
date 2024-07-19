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
    <div className="flex flex-col  bg-blue-600 p-2 shadow text-white top-0 sticky max-[426px]:gap-2">
      <h1 className="text-centre text-2xl font-bold">Feed App</h1>
      <div className="flex justify-between gap-3 px-10 max-[426px]:flex-col">
        <Input
          type="text"
          placeholder="Search news"
          className="w-[280px] max-[426px]:w-full"
          onChange={(e) => debouncedOnSearch(e.target.value)}
        />
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-[280px] max-[426px]:w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Header;
