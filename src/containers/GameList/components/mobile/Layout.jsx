import React from 'react';
import Grid from '@material-ui/core/Grid';
import GameList from './GameList';

export default class Layout extends React.Component {
    render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <GameList />
                </Grid>
            </Grid>
        );
    }
}