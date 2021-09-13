import React, { Fragment } from 'react';

import { fetchQueryResultsFromTermAndValue } from '../api';

const Searchable = (props) => {
  const searchTerm = props.searchTerm
  const searchValue = props.searchValue
  const setIsLoading = props.setIsLoading
  const setSearchResults = props.setSearchResults

  return (<span className="content">
    <a href="#" onClick={async (event) => {
        
        event.preventDefault()
        setIsLoading(true)

        try {
            const result = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue)
            setSearchResults(result)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }

    }}>{searchValue}</a>
   </span>)
}

const Feature = (props) => {
    const featuredResult = props.featuredResult
    const setIsLoading = props.setIsLoading 
    const setSearchResults = props.setSearchResults

    if(featuredResult) {
        const { 
            title, 
            dated, 
            images, 
            primaryimageurl, 
            description, 
            culture, 
            style, 
            technique, 
            medium, 
            dimensions, 
            people, 
            department, 
            division, 
            contact, 
            creditline
        } = featuredResult

        return (
            <main id="feature">
                <React.Fragment>
                    <div className="object-feature">
                        <header>
                            <h3>{title}</h3>
                            <h4>{dated}</h4>
                        </header>
                        <section className="facts">
                        
                            {description ? <span className="title">Description</span> : null }
                            {description ? <span className="content">{description}</span> : null}
    
                            {culture ? <span className="title">Culture</span> : null}
                            {culture ? <Searchable searchTerm="culture" searchValue={culture} setIsLoading={setIsLoading} setSearchResults={setSearchResults}/> : null}
    
                            {style ? <span className="title">Style</span> : null }
                            {style ? <span className="content">{style}</span> : null}
    
                            {technique ? <span className="title">Technique</span> : null }
                            {technique ? <Searchable searchTerm="technique" searchValue={technique} setIsLoading={setIsLoading} setSearchResults={setSearchResults}/> : null}
    
                            {medium ? <span className="title">Medium</span> : null}
                            {medium ? <Searchable searchTerm="medium" searchValue={medium.toLowerCase()} setIsLoading={setIsLoading} setSearchResults={setSearchResults}/> : null}
    
                            {dimensions ? <span className="title">Dimensions</span> : null}
                            {dimensions ? <span className="content">{dimensions}</span> : null}
    
                            {people ? <span className="title">People</span> : null}
                            {people ? people.map((person) => {
                                return <Searchable searchTerm="person" searchValue={person.displayname} setIsLoading={setIsLoading} setSearchResults={setSearchResults}/>
                            }) : null}
    
                            {department ? <span className="title">Department</span> : null}
                            {department ? <span className="content">{department}</span> : null}

                            {division ? <span className="title">Division</span> : null}
                            {division ? <span className="content">{division}</span> : null}

                            {contact ? <span className="title">Contact</span> : null}
                            {contact ? <span className="content">{contact}</span> : null}

                            {creditline ? <span className="title">Creditline</span> : null}
                            {creditline ? <span className="content">{creditline}</span> : null}
                        </section>
                        <section className="photos">
                            {images ? images.map((image) => {
                                return <img src={image.baseimageurl} alt={description} />
                            }) : primaryimageurl ? <img src={primaryimageurl}/> : null}
                        </section>
                    </div>
                </React.Fragment>
            </main>)
    } else {
        return <main id="feature"></main>
    }   
}

export default Feature;
