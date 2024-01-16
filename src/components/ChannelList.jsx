import { useFetch } from "../hooks/useFetch";
import { ListItem } from "./ListItem";
import PropTypes from "prop-types";

export const ChannelList = ({ data }) => {
  const { channel, isLoading } = useFetch(data);
  console.log("data",data);
  return (
    <>
      <h1>{data}</h1>
      {isLoading && <h2>Cargando...</h2>}
      <div className="card-grid">
        {channel.map((e) => (
          <ListItem key={e.id} {...e}/>
        ))}
      </div>
    </>
  );
};
ChannelList.propTypes = {
  data: PropTypes.string.isRequired,
};
