import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import GameList from '../../../GameList';
import GameDetailCard from '../../../GameDetail/components/mobile/DetailCard';
import {verticalBox, horizontalBox} from '../../../../constants';

export default class Layout extends React.Component {
    render() {
        const {
            selectedGame = {}, 
        } = this.props;

        return (
            <Grid container>
                <Grid 
                        item 
                        xs={12}
                        style={{
                            ...horizontalBox,
                            justifyContent: 'space-between',
                            padding: '0 10px',
                            boxSizing: 'border-box',
                            marginTop: '10px'
                        }}
                >
                    <HeaderText>Games</HeaderText>
                    <Fab 
                            color='primary'
                            style={{
                                width: '35px',
                                height: '35px',
                                boxShadow: 'none'
                            }}
                            onClick={this.props.toggleActivityBottomSheet}
                    >
                        A
                    </Fab>
                </Grid>
                <Grid 
                        item 
                        xs={6}
                        style={{
                            height: '100vh',
                            padding: '20px',
                            boxSizing: 'border-box'
                        }}
                >
                    <GameList 
                        onGameSelected={this.props.onGameSelected}
                        addUserActivity={this.props.addUserActivity}
                    />
                </Grid>
                <Grid 
                        item 
                        xs={6}
                        style={{
                            ...verticalBox,
                            height: '100vh',
                            padding: '20px',
                            boxSizing: 'border-box'
                        }}
                >
                    <GameDetailCard game={selectedGame} />
                </Grid>
            </Grid>
        );
    }
}

const HeaderText = styled.h3`
    font-size: 22px;
    color: #404040;
    font-weight: 700;
`;