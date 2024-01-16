import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


export default class News extends Component {
    static defaultProps={
        country:'in',
        pageSize:8,
        category:'science'
    }

    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
    }

    constructor(){

        super()
        console.log("hello from News Constructor")
        this.state = {
            articles:[],
            loading: false,
            page: 1,
            totalResults:0
        }
    }

    async componentDidMount(){
        console.log("cdm");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=913d4328822a4203a857727dce9d37a7&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({ articles: parsedData.articles , totalResults:parsedData.totalResults,loading:false })
    }

    handleNextClick = async () => {
        console.log("Next");
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))){}
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=913d4328822a4203a857727dce9d37a7&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData = await data.json()
            
            this.setState({
                page: this.state.page + 1,
                totalresults:parsedData.totalResults,

                loading:false
            })
        }
    

    handlePrevClick = async () => {
        console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=913d4328822a4203a857727dce9d37a7&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            totalresults:parsedData.totalResults,

            loading:false
        })
    }

    fetchMoreData = async () => {

        this.setState({page:this.state.page+1})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=913d4328822a4203a857727dce9d37a7&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData = await data.json()
            
            this.setState({
                // page: this.state.page + 1,
                totalresults:parsedData.totalResults,
                articles:this.state.articles.concat(parsedData.articles),
                loading:false
            })
      };

  render() {


    return (
      <>
      <h1 className='text-center mt-5 justify-content-around'>NewsMonk - Top Headlines</h1>
      {/* {this.state.loading && <Spinner/>} */}
      <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className='container'>

        </div>
      <div className='row my-3 justify-content-around'>
       {this.state.articles.map((element)=>{
        return  <div className='col-md-4 justify-content-around' key={element.url} >
        <NewsItem title={element.title?element.title.slice(0, 45):""}
            description={element.description?element.description.slice(0, 88):""} ImgUrl={element.urlToImage} NewsUrl={element.url} />
        </div>
       })}
      </div>

      
      </InfiniteScroll>

</>
      

    )
  }
}
