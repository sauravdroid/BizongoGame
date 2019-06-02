import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import GameList from '../../../GameList';
import GameDetailBottomSheet from '../../../GameDetail/components/mobile/DetailBottomSheet';
import {horizontalBox} from '../../../../constants';

export default class Layout extends React.Component {
    render() {
        const {
            selectedGame = {}, 
            gameDetailBottomSheetOpen = false
        } = this.props;

        return (
            <Grid container>
                <GameDetailBottomSheet 
                    open={gameDetailBottomSheetOpen}
                    onClose={() => {
                        this.props.toggleGameDetailBottomSheet && this.props.toggleGameDetailBottomSheet();
                    }}
                    game={selectedGame}
                />
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
                <Grid item xs={12}>
                    <GameList 
                        onGameSelected={this.props.onGameSelected}
                        addUserActivity={this.props.addUserActivity}
                    />
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