import "./SearchBar.css";

import searchIconPath from "../../../assets/icons/search.png";
import filterIconPath from "../../../assets/icons/filter.png";
import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon } from '@radix-ui/react-icons';

const globalStyle: CSSStyleDeclaration = getComputedStyle(document.body);

interface Props {
	onSearchEnter: (query: string) => Promise<void>;
    filterContent: JSX.Element;
}

export default function SearchBar({ onSearchEnter, filterContent }: Props) {
	const [searchBarContainerBorder, setSearchBarContainerBorder] = useState(`0.1px solid ${globalStyle.getPropertyValue("--border-color")}`);
	const [searchBarInputValue, setSearchBarInputValue] = useState("");

	function onSearchInputFocused() {
		setSearchBarContainerBorder(`0.1px solid ${globalStyle.getPropertyValue("--border-color-focused")}`);
	}

	function onSearchInputBlurred() {
		setSearchBarContainerBorder(`0.1px solid ${globalStyle.getPropertyValue("--border-color")}`);
	}

	function onChange(changeEvent: ChangeEvent<HTMLInputElement>) {
		setSearchBarInputValue(changeEvent.target.value);
	}

	function onSearchKeyDown(keyboardEvent: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
		if (keyboardEvent.key === "Enter") {
			onSearchEnter(searchBarInputValue);
		}
	}

	return (
		<div style={{ border: searchBarContainerBorder }} className="search-bar-container">
			<div className="search-icon-container">
				<img className="search-icon" src={searchIconPath}></img>
			</div>

			<input className="search-bar" onKeyDown={onSearchKeyDown} onChange={onChange} onFocus={onSearchInputFocused} onBlur={onSearchInputBlurred} type="text" placeholder="Search" name="search"></input>

			<div className="filter-icon-container">
				<Popover.Root>
					<Popover.Trigger asChild>
                        <img className="filter-icon" src={filterIconPath}></img>
					</Popover.Trigger>
					<Popover.Portal>
						<Popover.Content className="PopoverContent" sideOffset={16}>
                            <div className="filter-popover-items">
                                {filterContent}
                            </div>
                            
							<Popover.Close className="PopoverClose" aria-label="Close">
								<Cross2Icon className="popover-close-icon"/>
							</Popover.Close>
						</Popover.Content>
					</Popover.Portal>
				</Popover.Root>
			</div>
		</div>
	);
}
