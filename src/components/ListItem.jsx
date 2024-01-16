import PropTypes from "prop-types";
import { format } from "date-fns";

export const ListItem = ({ title, thumbnails, publishedAt, viewCount }) => {


  
  const dateFormat = format(publishedAt, "dd/MM/yyyy");

  return (
    <div className="card">
      {/* <img src={url} alt={title} /> */}
      <div className="card">
        <img src={thumbnails} alt={title} />
        <p>{title}</p>
        <h4>Fecha de publicacion: {dateFormat}</h4>
        <h4>Numero de Visitas: {viewCount}</h4>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnails: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  viewCount: PropTypes.string.isRequired,
};
