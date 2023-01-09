import React, {useState} from 'react'
import '../App.css';
 
const News = ({ news }) => {

    const [search, setSearch] = useState('');

    return (
        <div>
            <div>
                <center><h1 className='header'><b>Latest News</b></h1></center>
                <input className='search_box' type='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search...'
                /><br/>
                <div className='all__news'>
                    {news.filter(news => news.title.toLowerCase().includes(search.toLowerCase())).map(news => {
                        return (
                            <div className="news">
                                <h5 className="news__title">{news.title}</h5><br />
                                <h6 className="news__author">{news.author}</h6><br />
                                <p className="news__desc">{news.description}</p><br/>
                                <span className='news__source'>{news.source}</span><br/>
                                <p className='news__published'>{news.publishedAt}</p>
                            </div>
                        )
                    })}
                </div>    
            </div>
            {/* <center><h1 className='header'><b>Latest News</b></h1></center>
            <div className='all__news'>
            {news.map((news) => (
                <div className=' head__text'>
                   
                    <div className="news">
                        <h5 className="news__title">{news.title}</h5>
                        <h6 className="news__author">{news.author}</h6>
                        <p className="news__desc">{news.description}</p><br/>
                        <span className='news__source'>{news.source}</span>
                        <span className='news__published'>{news.publishedAt}</span>
                      </div>
                
                </div>
            ))}
            </div> */}
        </div>
    );
};
 
export default News;