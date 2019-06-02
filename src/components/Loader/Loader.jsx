import React from 'react';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import {verticalBox, horizontalBox} from '../../constants';

export default class LoaderComponent extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (!_.isEqual(this.props, nextProps) || !_.isEqual(nextState, this.state)) {
            return true;
        }

        return false;
    }

    render() {
        return (
            <Grid 
                    container
                    className='loader-container' 
                    style={{
                        ...verticalBox,
                        height: 'calc(100vh - 36px)', 
                        width: '100%', backgroundColor: '#fff',
                    }} 
                    alignItems="center" 
                    justify="center"
            >
                <CircularProgress/>
                <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: 500,
                            color: '#222',
                            marginTop: '20px',
                            textAlign: 'center'
                        }}
                >
                    Please wait, while the games are being loaded.
                </h3>
            </Grid>
        );
    }
}
