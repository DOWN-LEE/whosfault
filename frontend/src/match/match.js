import React, { useState, useEffect } from 'react';
import { Dropdown, Input, Header,Image, Container, Menu, Grid, Form, Segment, Icon  } from 'semantic-ui-react'
import Userbox from './userbox'; 
import './match.css';


const champion_dict = {266: 'Aatrox', 103: 'Ahri', 84: 'Akali', 12: 'Alistar', 32: 'Amumu', 34: 'Anivia', 1: 'Annie', 523: 'Aphelios', 22: 'Ashe', 136: 'AurelionSol', 268: 'Azir', 432: 'Bard', 53: 'Blitzcrank', 63: 'Brand', 201: 'Braum', 51: 'Caitlyn', 164: 'Camille', 69: 'Cassiopeia', 31: 'Chogath', 42: 'Corki', 122: 'Darius', 131: 'Diana', 119: 'Draven', 36: 'DrMundo', 245: 'Ekko', 60: 'Elise', 28: 'Evelynn', 81: 'Ezreal', 9: 'Fiddlesticks', 114: 'Fiora', 105: 'Fizz', 3: 'Galio', 41: 'Gangplank', 86: 'Garen', 150: 'Gnar', 79: 'Gragas', 104: 'Graves', 120: 'Hecarim', 74: 'Heimerdinger', 420: 'Illaoi', 39: 'Irelia', 427: 'Ivern', 40: 'Janna', 59: 'JarvanIV', 24: 'Jax', 126: 'Jayce', 202: 'Jhin', 222: 'Jinx', 145: 'Kaisa', 429: 'Kalista', 43: 'Karma', 30: 'Karthus', 38: 'Kassadin', 55: 'Katarina', 10: 'Kayle', 141: 'Kayn', 85: 'Kennen', 121: 'Khazix', 203: 'Kindred', 240: 'Kled', 96: 'KogMaw', 7: 'Leblanc', 64: 'LeeSin', 89: 'Leona', 876: 'Lillia', 127: 'Lissandra', 236: 'Lucian', 117: 'Lulu', 99: 'Lux', 54: 'Malphite', 90: 'Malzahar', 57: 'Maokai', 11: 'MasterYi', 21: 'MissFortune', 62: 'MonkeyKing', 82: 'Mordekaiser', 25: 'Morgana', 267: 'Nami', 75: 'Nasus', 111: 'Nautilus', 518: 'Neeko', 76: 'Nidalee', 56: 'Nocturne', 20: 'Nunu', 2: 'Olaf', 61: 'Orianna', 516: 'Ornn', 80: 'Pantheon', 78: 'Poppy', 555: 'Pyke', 246: 'Qiyana', 133: 'Quinn', 497: 'Rakan', 33: 'Rammus', 421: 'RekSai', 526: 'Rell', 58: 'Renekton', 107: 'Rengar', 92: 'Riven', 68: 'Rumble', 13: 'Ryze', 360: 'Samira', 113: 'Sejuani', 235: 'Senna', 147: 'Seraphine', 875: 'Sett', 35: 'Shaco', 98: 'Shen', 102: 'Shyvana', 27: 'Singed', 14: 'Sion', 15: 'Sivir', 72: 'Skarner', 37: 'Sona', 16: 'Soraka', 50: 'Swain', 517: 'Sylas', 134: 'Syndra', 223: 'TahmKench', 163: 'Taliyah', 91: 'Talon', 44: 'Taric', 17: 'Teemo', 412: 'Thresh', 18: 'Tristana', 48: 'Trundle', 23: 'Tryndamere', 4: 'TwistedFate', 29: 'Twitch', 77: 'Udyr', 6: 'Urgot', 110: 'Varus', 67: 'Vayne', 45: 'Veigar', 161: 'Velkoz', 254: 'Vi', 234: 'Viego', 112: 'Viktor', 8: 'Vladimir', 106: 'Volibear', 19: 'Warwick', 498: 'Xayah', 101: 'Xerath', 5: 'XinZhao', 157: 'Yasuo', 777: 'Yone', 83: 'Yorick', 350: 'Yuumi', 154: 'Zac', 238: 'Zed', 115: 'Ziggs', 26: 'Zilean', 142: 'Zoe', 143: 'Zyra'}
const spell_dict = {21: 'SummonerBarrier', 1: 'SummonerBoost', 14: 'SummonerDot', 3: 'SummonerExhaust', 4: 'SummonerFlash', 6: 'SummonerHaste', 7: 'SummonerHeal', 13: 'SummonerMana', 30: 'SummonerPoroRecall', 31: 'SummonerPoroThrow', 11: 'SummonerSmite', 39: 'SummonerSnowURFSnowball_Mark', 32: 'SummonerSnowball', 12: 'SummonerTeleport'}

const match=(props)=>{

    
    const typeTo = (type) =>{
        if(type==420) return '솔랭'
        if(type==430) return '노말'
        if(type==440) return '자랭'
        if(type==450) return '칼바람'
        return '뭔데시발'
    }


    const targetuser = props.info["participants"]["1"]["summonerName"] == props.user ? props.info["participants"]["1"] : 
                    props.info["participants"]["2"]["summonerName"] == props.user ? props.info["participants"]["2"] :
                    props.info["participants"]["3"]["summonerName"] == props.user ? props.info["participants"]["3"] : 
                    props.info["participants"]["4"]["summonerName"] == props.user ? props.info["participants"]["4"] : 
                    props.info["participants"]["5"]["summonerName"] == props.user ? props.info["participants"]["5"] : 
                    props.info["participants"]["6"]["summonerName"] == props.user ? props.info["participants"]["6"] : 
                    props.info["participants"]["7"]["summonerName"] == props.user ? props.info["participants"]["7"] : 
                    props.info["participants"]["8"]["summonerName"] == props.user ? props.info["participants"]["8"] : 
                    props.info["participants"]["9"]["summonerName"] == props.user ? props.info["participants"]["9"] : 
                    props.info["participants"]["10"]["summonerName"] == props.user ? props.info["participants"]["10"] : "시발뭐지?";
    
    const team1_worst = () =>{
        let worst = props.info["participants"]["1"]["summonerName"];
        let worst_rank = props.info["participants"]["1"]['ranking']
        for(var i=2; i<=5; i++){
            if(worst_rank < props.info["participants"][String(i)]['ranking']){
                worst = props.info["participants"][String(i)]["summonerName"];
                worst_rank = props.info["participants"][String(i)]['ranking'];
            }
        }
        return worst;
    }

    const team2_worst = () =>{
        let worst = props.info["participants"]["6"]["summonerName"];
        let worst_rank = props.info["participants"]["6"]['ranking']
        for(var i=7; i<=10; i++){
            if(worst_rank < props.info["participants"][String(i)]['ranking']){
                worst = props.info["participants"][String(i)]["summonerName"];
                worst_rank = props.info["participants"][String(i)]['ranking'];
            }
        }
        return worst;
    }

    return(
        <Segment className={targetuser["win"]? 'matchbox_win':'matchbox_loss'}>
            <Grid>
                <Grid.Column width={4} >
                    <Grid.Row  >
                        <div style={{textAlign:'left'}}>
                            <span className='rank_type'>{typeTo(props.info['queueId'])} </span>
                            <span className={targetuser["win"]? 'game_result':'game_result1'} >{targetuser["win"]? '승리':'패배'}</span>
                        </div>
                    </Grid.Row>
                    <Grid.Row>

                        <Grid>
                        <Grid.Row columns={3}>
                            <Grid.Column width={7} verticalAlign='middle'>
                                <img src={'http://ddragon.leagueoflegends.com/cdn/11.9.1/img/champion/'+targetuser['champion']+'.png'} className='champion_img' />
                            </Grid.Column>
                            <Grid.Column width={4} verticalAlign='middle'>
                                <img src={'http://ddragon.leagueoflegends.com/cdn/11.9.1/img/spell/'+spell_dict[targetuser['spell1']]+'.png'} className='spell_img'/>
                                <img src={'http://ddragon.leagueoflegends.com/cdn/11.9.1/img/spell/'+spell_dict[targetuser['spell2']]+'.png'} className='spell_img'/>
                            </Grid.Column>
                            <Grid.Column width={5} verticalAlign='middle'>
                                <div className='kda_score'>{targetuser['kills']} / {targetuser['deaths']} / {targetuser['assists']}</div>
                                <div className='kda'>({Number(targetuser['deaths'])==0 ? 'Perfect': ((Number(targetuser['kills'])+Number(targetuser['assists']))/Number(targetuser['deaths'])).toFixed(1)})</div>
                                <br/>
                            </Grid.Column>
                        </Grid.Row>
                        </Grid>

                    </Grid.Row>
                </Grid.Column>
                <Grid.Column width={2} className={props.info["participants"]["1"]['win']?'fucking1':'fucking2'} textAlign='center' floated='right'>
                    <div className={props.info["participants"]["1"]['win']?'fucking1':'fucking2'}>{props.info["participants"]["1"]['win']? '버스 탑승러❤':'패배의 원흉'}</div>
                    <br/>
                    {team1_worst()}
                </Grid.Column>        
                <Grid.Column width={3} verticalAlign='middle'>
                    <Userbox user={props.info['participants']["1"]} champion={props.info['participants']['1']['champion']}/>
                    <Userbox user={props.info['participants']['2']} champion={props.info['participants']['2']['champion']}/>
                    <Userbox user={props.info['participants']['3']} champion={props.info['participants']['3']['champion']}/>
                    <Userbox user={props.info['participants']['4']} champion={props.info['participants']['4']['champion']}/>
                    <Userbox user={props.info['participants']['5']} champion={props.info['participants']['5']['champion']}/>
                </Grid.Column>        
                <Grid.Column width={3} verticalAlign='middle'>
                    <Userbox right={true} user={props.info['participants']['6']} champion={props.info['participants']['6']['champion']}/>
                    <Userbox right={true} user={props.info['participants']['7']} champion={props.info['participants']['7']['champion']}/>
                    <Userbox right={true} user={props.info['participants']['8']} champion={props.info['participants']['8']['champion']}/>
                    <Userbox right={true} user={props.info['participants']['9']} champion={props.info['participants']['9']['champion']}/>
                    <Userbox right={true} user={props.info['participants']['10']} champion={props.info['participants']['10']['champion']}/>
                </Grid.Column>        
                <Grid.Column width={3} className={props.info["participants"]["6"]['win']?'fucking1':'fucking2'}  textAlign='center'>
                    <div className={'1'}>{props.info["participants"]["6"]['win']? '버스 탑승러❤':'패배의 원흉'}</div>
                    <br/>
                    {team2_worst()}
                </Grid.Column>                         
            </Grid>
        </Segment>
    )
}

export default match


