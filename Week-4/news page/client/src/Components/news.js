import React, {useState} from 'react'
import '../App.css';
 
const News = ({ news }) => {

    const [search, setSearch] = useState('');

    return (
        <div>
            <div>
                <input className='search_box' type='text' name='search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search...'
                    
                /><br/>
                <div className='all__news'>
                    {news.filter(news => news.title.toLowerCase().includes(search.toLowerCase())).map(news => {
                        return (
                            <div className="news">
                                <h5 className="news__title">{news.title}</h5><br />
                                <h6 className="news__author"><b></b>{news.author}</h6><br />
                                <p className="news__desc"><b>{news.description}</b></p><br/>
                                <span className='news__source'><b style={{color:'blue'}} >Source:- </b>{news.source}</span><br/>
                                <p className='news__published'><b style={{color:'blue'}}>Published On:- </b><br/>{news.published_at}</p>
                            </div>
                        )
                    })}
                </div>    
            </div>
        </div>
    );
};
 
export default News;