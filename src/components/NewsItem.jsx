import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {

    let {title,description,ImgUrl,NewsUrl}=this.props;

    return (
      <div>
      <div className="card mx-3" Style="width: 18rem;">
  <img src={!ImgUrl?"https://picsum.photos/id/237/200/120":ImgUrl} class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">{title}...</h5>
    <p class="card-text">{description}...</p>
    <a href={NewsUrl} target='blank' class="btn btn-sm btn-primary">Read more</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem