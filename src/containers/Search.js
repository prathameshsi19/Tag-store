import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import "./Search.css";
import {useFormFields} from "../libs/hooksLib";
//new import
import search from "../search.svg";

export default function Search() {
  const [tags, setTags] = useState("");
  const [showResults, setShowResults] = React.useState(false)
    const onClick = () => setShowResults(true)
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAppContext();
  const [fields, handleFieldChange] = useFormFields({
    searchText: "",
  });

  async function searchTags() {
        if (!isAuthenticated) {
            return;
        }

        try {
            const tags = await loadTags();
            setTags(tags);
        } catch (e) {
            onError(e);
        }
    }

  function loadTags() {
      return API.get("searchTags", "/find-query/tags", fields.searchText);
  }


  function validateForm() {
    return  fields.searchText.length > 0;
  }

  function renderTagsList(tags) {
    return [{}].concat(tags).map((tag, i) =>
        i !== 0 ? (
            <ListGroupItem header={tag.links.trim().split("\n")[0]}>
            </ListGroupItem>
        ): (
              <ListGroupItem>
                <h4>
                  <b>{"\uFF0B"}</b> Links
                </h4>
              </ListGroupItem>
        )
    );
  }

  function renderNotes() {
    return (
        <div className="tags">
          <PageHeader>Results</PageHeader>
          <ListGroup>
            {!isLoading && renderTagsList(tags)}
          </ListGroup>
        </div>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
      <div className="Search">
        <form onSubmit={handleSubmit}>
        <div className="image" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
	  	<img src={search} alt="login" height="20%" width="20%" alignItems="center"/> 
	    </div>
          <FormGroup controlId="searchText" bsSize="large">
            <ControlLabel alignItems="center">Search</ControlLabel>
            <FormControl
                autoFocus
                type="search"
                value={fields.searchText}
                onChange={handleFieldChange}
            />
          </FormGroup>
          <Button block bsStyle="primary" bsSize="large" disabled={!validateForm()} type="submit" onClick={() => {searchTags().then(r => onClick());}}>
            Search
          </Button>
        </form>
          {showResults  ? renderNotes() : null}
      </div>
  );
}
//lines added 77 -79
//<div className="image" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
	  //	<img src={search} alt="login" height="20%" width="20%" alignItems="center"/> 
	    //</div>