import React, { Component } from "react";

class Card extends Component {
  renderCardImage(images) {
    if (images.length) {
      return images[0].url;
    } else {
      return "/images/image_not_available.png";
    }
  }

  render() {
    const props = this.props;
    // console.log(props);
    return (
      <div className={`card_item_wrapper`}>
        <div
          className="image"
          style={{
            background: `url(${this.renderCardImage(props.images)}) no-repeat`
          }}
        />

        <div className="action_container">
          <div className="tags">
            <div className="name">{props.name}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;