import React from 'react';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import VirtualList from 'react-tiny-virtual-list';
import CustomOutlinedInput from '../../../../components/Inputs/CustomOutlinedInput';
import GameListItem from './GameListItem';

export default class GameList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        };
    }

    render() {
        const gameList = _.get(this.props, 'gameList', []);

        return (
            <Grid 
                    container
                    style={{
                        padding: '10px 20px'
                    }}
            >
                <Grid 
                        item 
                        xs={12}
                >
                    <CustomOutlinedInput 
                        style={{width: '100%'}}
                        placeholder='Search Games'
                    />
                </Grid>
                <Grid item xs={12}>
                    {/* <VirtualList
                        width='100%'
                        height={600}
                        itemCount={gameList.length}
                        itemSize={50} // Also supports variable heights (array or function getter)
                        renderItem={({index, style}) =>
                            <div key={index} style={style}>
                                Letter: {gameList[index].name}, Row: #{index}
                            </div>
                        }
                    /> */}
                    <div>{gameList[0].name}</div>
                    {/* {
                        gameList.map((gameListItem, index) => {
                            return (
                                <GameListItem {...gameListItem} key={index}/>
                            );
                        })
                    } */}
                </Grid>
            </Grid>
        );
    }
}