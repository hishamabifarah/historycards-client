import React from "react";
import { Link } from "react-router-dom";

// import FontAwesomeIcon from "@fortawesome/react-fontawesome";
// import faShoppingBag from "@fortawesome/fontawesome-free-solid/faShoppingBag";

const Button = props => {
  const buttons = () => {
    let template = null;

    switch (props.type) {
      case "default":
        template = (
          <Link
            className={!props.altClass ? "link_default" : props.altClass}
            to={props.linkTo}
            {...props.addStyles}
          >
            {props.title}
          </Link>
        );
        break;

      case "cart_link":
        template = (
          <div className="bag_link" onClick={() => props.runAction()}>
            {/* <FontAwesomeIcon icon={faShoppingBag} /> */}
          </div>
        );
        break;

      default:
        template = null;
    }

    return template;
  };

  return <div className="my_link">{buttons()}</div>;
};

export default Button;