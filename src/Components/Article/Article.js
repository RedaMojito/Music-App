import React from 'react';
import './Article.css';
import Wrapper from '../../Wrapper/Wrapper';
const Article = (props) => {


    return (  
        <Wrapper>
            <div className='mainArtContainer' >  
                <div className='articleContainer'>
                    <img className='poster' src={props.poster} alt={'poster'}></img>
                    <h2 className='artTitle'>{props.title}</h2>
                </div>
            </div>    
        </Wrapper>
     
    );
};

export default Article;