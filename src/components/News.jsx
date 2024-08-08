import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader'

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
        console.log("Welcome to constructor")
    }

    capitalizeFirstLetter= (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    async UpadateNews(PageNo){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=30ab8c67ce724d76869cb57bc81969b8&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${PageNo}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        });
        document.title=`${this.capitalizeFirstLetter(this.props.category)} - Daily Spark`
    }

    async componentDidMount() {
        this.UpadateNews(this.state.page);
    }

    handlePreviousPage = async () => {
        console.log("Previous");
        this.setState(
            {page: this.state.page - 1}, 
            () => {this.UpadateNews(this.state.page)})
    }

    handleNextPage = async () => {
        console.log("Next");
        this.setState(
            {page: this.state.page + 1}, 
            () => {this.UpadateNews(this.state.page)})
    }

    render() {
        console.log("Welcome to Render")
        return (
            <div className='container news-headline'>
                <h1 className='text-center'>Today's Top Headlines About - {this.capitalizeFirstLetter(this.props.category)}</h1>
                {this.state.loading && <Loader />}
                <div className="row my-3">
                    {!this.state.loading && this.state.articles.map(
                        (element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 55) : ""} description={element.description ? element.description.slice(0, 88) : " "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        }

                    )}
                </div>
                <div className='d-flex justify-content-between my-3'>
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-outline-dark" onClick={this.handlePreviousPage}>&larr; Previous</button>
                    <button type="button" className="btn btn-outline-dark" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.page)} onClick={this.handleNextPage}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
