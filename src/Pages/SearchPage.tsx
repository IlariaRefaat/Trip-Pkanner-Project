import { Autocomplete, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { apiCalls } from "../api/api";
import { ActivitySearchResult } from "../Components/core/ActivitySearchResult";
import { InputText } from "../Components/core/InputText";
import { Container } from "../Components/core/layout/Container";
import { LocationSearchResult } from "../Components/core/LocationSearchResult";
import { SearchForm } from "../Components/widgets/search/SearchForm";
import { Activity } from "../models/Activity";
import { Location } from "../models/Location";
import { SearchResult } from "../types/Search";
import styles from "./SearchPage.module.css";

export const SearchPage = () => {
  const { t } = useTranslation();
  const options = [t("common.activities"), t("common.locations")];
  const [results, setResults] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState<string | undefined>("");
  const [filter, setFilter] = useState<string | null>(null);
  const params = new URLSearchParams(window.location.search);
  const searchWord = params.get("q");
  const navigate = useNavigate();
  const filteredResults: SearchResult[] = [];

  // React.useEffect(() => {
  //   if (searchWord) {
  //     setQuery(searchWord);
  //     const _results = apiCalls.search(searchWord);
  //     setResults(_results);
  //   }
  // }, [searchWord]);

  // const handleSearch = ({ target }: ChangeEvent<HTMLInputElement>): void => {
  //   const _query: string = target.value.toLowerCase();
  //   setQuery(_query);
  // };

  // const onSubmit = (e: any): void => {
  //   e.preventDefault();

  //   if (query) {
  //     navigate(`/Search?q=${query}`);
  //     const _results = apiCalls.search(query);

  //     if (query === "") {
  //       setResults([]);
  //     } else {
  //       if (filter === "Locations" || filter === "Ubicaciones") {
  //         console.log("hi");
  //         _results.map(({ item, type }) => {
  //           if (type === "location") {
  //             filteredResults.push({
  //               type: "location",
  //               item: item,
  //             });
  //           }
  //           return filteredResults;
  //         });
  //         setResults(filteredResults);
  //       } else if (
  //         filter === "Activities" ||
  //         filter === "Actividades" ||
  //         filter === "Activités"
  //       ) {
  //         _results.map(({ type, item }) => {
  //           if (type === "activity") {
  //             filteredResults.push({
  //               type: "activity",
  //               item: item,
  //             });
  //           }
  //           return filteredResults;
  //         });
  //         setResults(filteredResults);
  //       } else {
  //         setResults(_results);
  //       }
  //     }
  //   }
  // };

  return (
    <>
      <Container>
        <SearchForm />
        {/* <form className={styles.searchContainer} onSubmit={onSubmit}>
          <InputTextSearchPage onChange={handleSearch} inputValue={query} />
          <Autocomplete
            value={filter}
            disablePortal
            options={options}
            renderInput={(params) => (
              <TextField {...params} label={t("common.filterBy")} />
            )}
            onChange={(event: any, newFilter: string | null) => {
              setFilter(newFilter);
            }}
            sx={{ width: 300 }}
          />
          <input type="submit" className={styles.searchButton} value="Search" />
        </form> */}
      </Container>
      <div className={styles.searchResultContainer}>
        <Container className={styles.searchResult}>
          {results.map(({ type, item }) => {
            return (
              <div key={`${type}-${item.id}`}>
                {type === "location" ? (
                  <LocationSearchResult
                    location={item as Location}
                    key={item.id}
                  />
                ) : (
                  <ActivitySearchResult
                    activity={item as Activity}
                    key={item.id}
                  />
                )}
              </div>
            );
          })}
        </Container>
      </div>
    </>
  );
};
