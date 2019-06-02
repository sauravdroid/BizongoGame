import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import {verticalBox} from '../../../../constants';

export default () => {
    const gridItemStyle = {
        ...verticalBox,
        alignItems: 'flex-start',
        paddingLeft: '5px'
    };

    return (
        <Grid 
                container
                style={{
                    margin: '10px 0'
                }}
        >
            <Grid 
                    item 
                    xs={2}
            />
            <Grid 
                    item 
                    xs={4}
                    style={gridItemStyle}
            >
                <Label>Name</Label>
            </Grid>
            <Grid 
                    item 
                    xs={3}
                    style={gridItemStyle}
            >
                <Label>Genre</Label>
            </Grid>
            <Grid 
                    item 
                    xs={2}
                    style={gridItemStyle}
            >
                <Label>Platform</Label>
            </Grid>
        </Grid>
    );
}

const Label = styled.h3`
    font-size: 80px;
    color: #808080;
    font-size: 12px;
    font-weight: 500;
`;