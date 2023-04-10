import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SearchInput from "../../components/Autocomplete/SearchInput";
import "./search.css";
import Typography from "@mui/material/Typography";

const Search = () => {
  return (
    <>
      <Header />
      <div className="body-container">
        <div className="search-container">
          <Typography variant="h2" className="logo">
            AniSearch
          </Typography>
          <SearchInput />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Search;
