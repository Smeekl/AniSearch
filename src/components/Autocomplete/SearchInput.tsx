import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {httpGet} from "../../services/api-service/ApiClient";
import debounce from "lodash.debounce";
import {Grid} from "@mui/material";
import Highlighter from "react-highlight-words";

export default function SearchInput() {
  const [value, setValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [searchOptions, setSearchOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSearchOptionsAsync = async (query: string) => {
    try {
      const searchData = await httpGet("anime", { q: query });
      return searchData.data.map((anime: any) => ({
        label: anime.title,
        ...anime,
      }));
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const getOptionsDelayed = useCallback(
    debounce((query: string, callback: (options: any) => void) => {
      setSearchOptions([]);
      getSearchOptionsAsync(query).then(callback);
    }, 350),
    []
  );

  useEffect(() => {
    setLoading(true);

    getOptionsDelayed(inputValue, (options: any) => {
      setSearchOptions(options);
      setLoading(false);
    });
  }, [inputValue, getOptionsDelayed]);

  return (
    <Autocomplete
      autoComplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      disablePortal
      id="combo-box-demo"
      loading={loading}
      options={searchOptions}
      sx={{ width: "100%" }}
      renderInput={(params) => <TextField {...params} fullWidth />}
      renderOption={(props, option: any) => {
        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
              >
                <Highlighter
                  highlightClassName="highlighted-option"
                  searchWords={[inputValue]}
                  autoEscape={true}
                  textToHighlight={option.title}
                />
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
