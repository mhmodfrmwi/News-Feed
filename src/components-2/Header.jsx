import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const Header = (props) => {
  const { onCategoryChange, onCountryChange } = props;
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [selectedCountry, setSelectedCountry] = useState("au");

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    onCategoryChange(value);
  };

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    onCountryChange(value);
  };

  return (
    <div className="flex flex-col gap-3 bg-indigo-500 p-3 shadow text-white">
      <h1 className="text-centre text-2xl font-bold">Feed App</h1>
      <div className="flex justify-between gap-3 px-10 max-[426px]:flex-col">
        <Select value={selectedCountry} onValueChange={handleCountryChange}>
          <SelectTrigger className="w-[280px] max-[426px]:w-full">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="in">India</SelectItem>
              <SelectItem value="us">USA</SelectItem>
              <SelectItem value="au">Australia</SelectItem>
              <SelectItem value="ru">Russia</SelectItem>
              <SelectItem value="fr">France</SelectItem>
              <SelectItem value="gb">United Kingdom</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
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
