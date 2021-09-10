import React from 'react';

const SearchInput = () => {
    return (
        <form className="flex items-center lg:ml-2 mt-5 lg:mt-0" action="#">
            <label className="form-control-addon-within rounded-full border-secondary">
                <input
                    type="text"
                    className="form-control border-none"
                    placeholder="Search"
                />
                <button
                    type="button"
                    className="btn btn-link text-secondary dark:text-gray-700 hover:text-primary dark:hover:text-primary text-xl leading-none la la-search mr-4"
                />
            </label>
        </form>
    );
};

export default SearchInput;