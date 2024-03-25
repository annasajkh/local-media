import "./SearchBar.css";

import searchIconPath from "../../../assets/icons/search.png";

import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState } from "react";

interface Props {
    onSearchEnter: (query: string) => Promise<void>
}


export default function SearchBar({onSearchEnter}: Props) {
    const [ searchBarContainerBorder, setSearchBarContainerBorder ] = useState("0.1px solid #30363d");
    const [ searchBarInputValue, setSearchBarInputValue] = useState("");

    function onSearchInputFocused() {
        setSearchBarContainerBorder("0.1px solid #363d44");
    }

    function onSearchInputBlurred() {
        setSearchBarContainerBorder("0.1px solid #30363d");
    }

    function onChange(changeEvent: ChangeEvent<HTMLInputElement>) {
        setSearchBarInputValue(changeEvent.target.value);
    }

    function onSearchKeyDown(keyboardEvent: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
        if(keyboardEvent.key === "Enter") {
            onSearchEnter(searchBarInputValue);
        }
    }

	return (
        <div style={{border: searchBarContainerBorder}} className="search-bar-container">
            <div className="search-icon-container">
                <img src={searchIconPath} className="search-icon"></img>
                
            </div>
            <input onKeyDown={onSearchKeyDown} onChange={onChange} onFocus={onSearchInputFocused} onBlur={onSearchInputBlurred} className="search-bar" type="text" placeholder="Search" name="search"></input>
        </div>
	);
}