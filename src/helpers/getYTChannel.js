class getYTChannel {
  constructor( channelName, apiKey ) {
    this.channelName = channelName;
    this.apiKey = apiKey;
  }

  async getChannelId() {
    const response = await fetch( `https://www.googleapis.com/youtube/v3/search?
    part=snippet
    &type=channel
    &q=${ this.channelName }&key=${ this.apiKey }` )
    const data = await response.json();
    return data.items[0].id.channelId;
  }

  async getChannelData( channelId ) {
    const response = await fetch( `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${ channelId }&key=${ this.apiKey }` );
    const data = await response.json();
    return data.items[ 0 ];
  }

  async getChannelVideos( channelId ) {
    const response = await fetch( `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&channelId=${ channelId }&key=${ this.apiKey }` );
    const data = await response.json();
    const itemsWithStats = await Promise.all( data.items.map( async ( item ) => {
      const res = await fetch( `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${ item.id.videoId }&key=${ this.apiKey }` );
      const videoData = await res.json();
      if ( videoData.items && videoData.items[ 0 ] ) {
        return videoData.items[ 0 ];
      } else {
        return null;
      }
    } ) );

    // Filtrar los videos que no existen o han sido eliminados
    const validVideos = itemsWithStats.filter( video => video !== null );
    return validVideos;
  }
  async getAllData() {
    const channelId = await this.getChannelId();
    const channelData = await this.getChannelData( channelId );
    const channelVideos = await this.getChannelVideos( channelId );
    return { channelData, channelVideos };
  }
}
// Uso de la clase
/* const youTubeChannel = new getYTChannel( 'nombreDelCanal', 'tuClaveDeAPI' );
youTubeChannel.getAllData().then( data => {
  console.log( data );
} ); */

export default getYTChannel;
