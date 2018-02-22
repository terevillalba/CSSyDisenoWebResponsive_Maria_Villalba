import React, {Component} from 'react';

const NoResults = () =>{
    return(
        <div className="products">
            <div className="no-results">
                <img src="../src/assets/noResults.png" />
                <h2>Disculpe, no hay resultados para la búsqueda!</h2>
                <p>Intente de nuevo con otra palabra clave.</p>
            </div>
        </div>
    )
};

export default NoResults;
