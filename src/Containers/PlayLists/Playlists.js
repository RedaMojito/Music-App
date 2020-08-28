import React, { Component } from 'react';
import './Playlists.css';
import Spotify from 'spotify-web-api-js';
import SpotifyPlaylist from '../../Components/SpotifyPlaylist/SpotifyPlaylist';
import SpotifyPlaylistInfos from '../../Components/SpotifyPlaylistInfos/SpotifyPlaylistInfos';
const spotifyWebApi = new Spotify();

class Playlists extends Component {
    constructor(props){
        super(props);
        const params = this.getHashParams();
        this.state={
            playlist: [],
            spotID: '',
            coverImage: '',
            playlistTitle: '',
            owner: '',
            artists: [], 
            titles: [],
            albums: [],
            releaseDate: [],
            duration: []
        }
        if(params.access_token){
            spotifyWebApi.setAccessToken(params.access_token);
        }
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
      }

    componentDidMount(e){
        spotifyWebApi.getUserPlaylists('a84mgezmsf4iyv6wrkwtk8bsj')
        .then(response=>{
       /*    this.setState({playlist:response.items.map(plylst=>{
                return plylst.name })
                
            })*/
            const listResult = response.items.map(pl=>{
                return pl.name
            });
            this.setState({playlist: listResult});
            console.log(response.items[0]);
            }).catch(e=>{
            console.log(e);
        });
    }

    getID(playlistName){
        spotifyWebApi.getUserPlaylists('a84mgezmsf4iyv6wrkwtk8bsj')
        .then(response=>{
            let findobj =  response.items.find(f=>{
                return f.name === playlistName;
            });
            this.setState({spotID: findobj.id, playlistName: findobj.name, owner: findobj.owner.display_name},()=> this.getAll()); 
            
             console.log(this.state.playlistName);
        }).catch(e=>{
            console.log(e);
        });
    }
    getTracks(playlistID){
        spotifyWebApi.getPlaylistTracks(playlistID)
        .then(response=>{
        const  tit =   response.items.map(tit=>{
                return tit.track.name
            });
        const art = response.items.map(art=>{
            return art.track.artists[0].name
        })

        const alb = response.items.map(alb=>{
            return alb.track.album.name
        })
        const addedAt = response.items.map(added=>{
            return added.added_at.slice(0, 10)
        })

        const trackDuration = response.items.map(dur=>{
            let ms =   1000*Math.round(dur.track.duration_ms/1000);
                var d = new Date(ms);
                return d.getUTCMinutes() + ':' + d.getUTCSeconds()
        })
            this.setState({artists: art, titles: tit, albums: alb, releaseDate: addedAt, duration: trackDuration});

        }).catch(e=>{
            console.log(e);
        })
    }
    getPlaylistInfos(playlistID){
        spotifyWebApi.getPlaylistCoverImage(playlistID)
        .then(response=>{
            let coverURL = response[0].url;
            this.setState({coverImage:coverURL})
        }).catch(e=>{
            console.log(e);
        })
    }

    getAll(){
        this.getPlaylistInfos(this.state.spotID);
        this.getTracks(this.state.spotID);
    }

    render() {
        const listItems = this.state.playlist.map(item=>{
          return  <SpotifyPlaylist key={item} list={item} listID={()=> this.getID(item)} playlistInfos={()=> this.getPlaylistInfos(this.state.spotID)} />
        })
        return (
            <div className='playlistsContainer'>
               <div className='playlists'>
                     <h3 className='playlists-title'>Playlists</h3>
                {listItems}
               </div>
              
                
             <div className='playlist-infos'>
                <SpotifyPlaylistInfos playlistName={this.state.playlistName} cover={this.state.coverImage} playlistOwner={this.state.owner} />
                <table className='playlists-table'>
                    <thead className='playlists-table-titles'>
                        <tr className='table-rows-titles'>
                            <th>title</th>
                            <th>Artist</th>
                            <th>Album</th>
                            <th>Date</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr className='table-row'>
                            <td className='table-data-title'>
                               {this.state.titles.map(title=>{
                                 return <div className='single-title'> {title} </div> 
                               })}
                          </td> 
                          <td className='table-data-artist'>
                            {this.state.artists.map(artist=>{
                                 return  <div className='single-artist'> {artist} </div>
                            })}
                            </td> 
                            <td className='table-data-album'>
                            {this.state.albums.map(album=>{
                                 return  <div className='single-album'> {album} </div>
                            })}
                            </td> 
                            <td className='table-data-date'>
                            {this.state.releaseDate.map(release=>{
                                 return  <div className='single-date'> {release} </div>
                            })}
                            </td> 
                            <td className='table-data-duration'>
                            {this.state.duration.map(dur=>{
                                 return  <div className='single-duration'> {dur} </div>
                            })}
                            </td> 
                        </tr>
                    </tbody>
                 </table> 
              </div>  
      
            </div>
        );
    }
}

export default Playlists;