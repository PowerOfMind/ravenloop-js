import { useEffect, useState } from "react";
import { getChannelName } from '../helpers/getYTChannel';


export const useFetch = ( channelId ) => {
  const [ channel, setChannel ] = useState( [] );
  const [ isLoading, setIsLoading ] = useState( true );
  const getChannel = async () => {
    const newChannel = await getChannelName( channelId );
    setChannel( newChannel );
    setIsLoading( false );
  };
  useEffect( () => {
    getChannel();
  }, [ channelId ] ); // Añade channelId a la lista de dependencias
  return {
    channel,
    isLoading
  };
};