import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import InfiniteScroll from "react-infinite-scroll-component";
// import Loader from './Loader'
const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    const UpadateNews = async (page) => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&category=${props.category}&pageSize=${props.pageSize}&page=${page}`;
        setLoading(true);
        props.setProgress(30);
        let data = await fetch(url);
        props.setProgress(70);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false)
        props.setProgress(100);
        
    }


    useEffect(() => {
        UpadateNews();
            document.title = `${capitalizeFirstLetter(props.category)} - Daily Spark`
        //eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=30ab8c67ce724d76869cb57bc81969b8&category=${props.category}&pageSize=${props.pageSize}&page=${page+1}`;
        setPage(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(parsedData.articles.concat(articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    };


    return (
        <div className='container news-headline'>
            <h1 className='text-center'>Today's Top Headlines About - {capitalizeFirstLetter(props.category)}</h1>
            {/* {loading && <Loader />} */}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>}
            >
                <div className="container">
                    <div className="row my-3">
                        {articles.map(
                            (element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 55) : ""} description={element.description ? element.description.slice(0, 88) : " "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            }

                        )}
                    </div>
                </div>
            </InfiniteScroll>

        </div>
    )

}
News.defaultProps = {
    pageSize: 6,
    country: "us",
    category: "science"
}
News.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
}

export default News
