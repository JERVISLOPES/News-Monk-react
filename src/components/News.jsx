import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {


    constructor(){

        super()
        console.log("hello from News Constructor")
        this.state = {
            articles:[],
            loading: false
        }
    }

    async componentDidMount(){
        console.log("cdm");
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=913d4328822a4203a857727dce9d37a7";
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({ articles: parsedData.articles })
    }

  render() {


    return (
      <div className='container my-3'>
      <h1>NewsMonk - Top Headlines</h1>
      <div className='row my-3'>
       {this.state.articles.map((element)=>{
        return  <div className='col-md-4' key={element.url} >
        <NewsItem title={element.title?element.title.slice(0, 45):""}
            description={element.description?element.description.slice(0, 88):""} ImgUrl={element.urlToImage} NewsUrl={element.url} />
        </div>
       })}

      </div>
      </div>
      

    )
  }
}
