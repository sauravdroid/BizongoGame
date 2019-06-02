import React from 'react';
import Grid from '@material-ui/core/Grid';
import {horizontalBox, verticalBox} from '../../../../constants';
import Layout from './Layout';

export default class DetailCard extends React.Component {
    render() {
        const {game = {}} = this.props;

        return (
            <Grid 
                    container
                    style={{
                        padding: '20px',
                        paddingBottom: '60px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                        borderRadius: '4px',
                        boxSizing: 'border-box'
                    }}
            >
                <Layout game={game} />
            </Grid>
        );
    }
}