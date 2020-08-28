import React, { Component } from 'react';
import Article from '../../Components/Article/Article';
import './Articles.css';
import Spotify from 'spotify-web-api-js';
import SpotifyCurrent from '../../Components/SpotifyCurrent/SpotifyCurrent';
const spotifyWebApi = new Spotify();

class Articles extends Component {


    constructor(props){
        super(props);
        const params = this.getHashParams();
        this.state = {
            articles : [
                {
                id: '1',
                title:'ODIE, quand l\'introspection pousse a l\'action',
                image: require('../../Images/odie.jpg'),
                article:'Né à Montréal de parents nigérians, ODIE grandit à Toronto jusqu’à ses 12 ans, puis dans la Bay Area en Californie. A 23 ans, il se présente ainsi : « Je me vois comme un artiste analogique à l’ère digital. » Tel un élément analogique se concentrant sur les similitudes plutôt que sur les différences, il incarne ses morceaux et bâtit un pont entre son vécu et son œuvre.'
                 },
                 {
                id: '2',
                title:'MARTHA DA’RO, L’ENVOÛTANT SPLEEN VENU DE BELGIQUE',
                image: require('../../Images/MarthaDaro_Cover.jpg'),
                article:'Née à Mons, Martha Da’Ro a d’abord fait ses premiers pas en tant que chanteuse dans le groupe de Progressive Rap Soul’Art, gang d’amis qu’elle rejoint un peu par hasard, se laissant porter par l’envie et la curiosité et avec qui elle créera un EP aux sonorités très jazzy intitulé Granny’s Res EP (on y retrouve d’ailleurs, sur un titre, le talentueux Krisy sous son nom de producteur De La Fuentes).'
                    },
                {
                id: '3',
                title:'070 SHAKE, LA PROTÉGÉE DE KANYE WEST PREND SON ENVOL',
                image: require('../../Images/Don-Toliver.jpg'),
                article:'Contrairement aux mères porteuses que sont New York, Los Angeles ou encore Atlanta, et qui mettent au monde bon nombre de rappeurs qui explosent les charts, le New Jersey ne peut sa targuer d’un tel succès. Si certains artistes arrivent à tirer leur épingle du jeu et à prendre leur envol, le petit état au sud de New York ne semble pas occuper une place prépondérante dans leur cœur, contrairement aux capitales musicales susnommées dont les hommages sont infinis. 070 Shake est quant à elle imprégnée de sa ville et de cet état qui a été le forgeron de son identité aussi bien musicale et poétique qu’humaine.'
                    },  
                {
                    id: '4',
                    title:'DON TOLIVER : HOUSTON’S GOT TALENT',
                    image: require('../../Images/O70.jpg'),
                    article:'Âgé de 25 ans, le rappeur originaire de Houston (Texas) est promis à une carrière à succès. Celui que l’on surnomme déjà « The Young Houston Legend » vient de sortir son tout premier album Heaven or Hell, l’occasion pour nous de faire le point sur son parcours.'   
                },
                {
                    id: '5',
                    title:'RAY BLK, LA VOIX ENGAGÉE DU R&B ANGLAIS',
                    image: require('../../Images/rayblk1.jpg'),
                    article:'Ray BLK, un nom qui vous dit peut-être quelque chose si vous avez en tête l’excellent titre « My Hood » en featuring avec Stormzy ? Quoi qu’il en soit, cette Londonienne d’origine nigérienne reste malgré tout encore assez confidentielle malgré la qualité de ses premiers EP dans lesquels elle dissémine ses convictions et ses combats. Portrait d’une artiste engagée qu’on espère voir percer en 2020.'
                }

        ],
        loggedIn : params.access_token ? true : false,
        nowPlaying : {
            name : 'not Checked', 
            image: ''
        }
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
      
      getNowPlaying(){
          spotifyWebApi.getMyCurrentPlaybackState()
          .then(response=>{
              this.setState({
                  nowPlaying:{
                      name: response.item.name,
                      image: response.item.album.images[0].url
                  }
              })
          }).catch(e=>{
            console.log(e);
          })
      }
    componentDidMount(e){
        spotifyWebApi.getPlaylistTracks('6X7lZQChV035g4ZbOIGycF')
        .then(response=>{
            console.log(response.items.map(trc=>{
             let ms =   1000*Math.round(trc.track.duration_ms/1000);
                var d = new Date(ms);
                return d.getUTCMinutes() + ':' + d.getUTCSeconds()
            }))
        }).catch(e=>{
            console.log(e);
        })
    }
    render() {
            const articleList = this.state.articles.map( art=>{
                return  ([
                          <Article key={art.id} title={art.title} poster={art.image} article={art.article} />
                ]);      
            });
        return (
                   <div className='articlesContainer'>
                {articleList}
                <SpotifyCurrent currentTrack={this.state.nowPlaying.name} currentCover={this.state.nowPlaying.image} checkCurrent={()=> this.getNowPlaying()}/>
            </div>
        );
    }
}

export default Articles;