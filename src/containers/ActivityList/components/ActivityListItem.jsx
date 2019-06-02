import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import {verticalBox} from '../../../constants';

export default class ActivityListItem extends React.Component {
    render() {
        const {date = '=', activity = '-', index = 0} = this.props;
        const gridItemStyle = {
            ...verticalBox,
            alignItems: 'flex-start',
            paddingLeft: '10px'
        };

        return (
            <Grid 
                    container 
                    style={{
                        height: '80px',
                        background: index % 2 === 0 
                            ? 'linear-gradient(to right, #F7FBFF, #EDF5FD)'
                            : '#fff',
                        overflowY: 'hidden',
                        paddingLeft: '10px',
                        boxSizing: 'border-box'
                    }}
            >
                <Grid 
                        item 
                        xs={5}
                        style={gridItemStyle}
                >
                    <Text>{date}</Text>
                </Grid>
                <Grid 
                        item 
                        xs={7}
                        style={gridItemStyle}
                >
                    <Text>{activity}</Text>
                </Grid>
            </Grid>
        );
    }
}

const Text = styled.h3`
    font-size: 14px;
    color: #1C1B1E;
    font-weight: 500;
`;