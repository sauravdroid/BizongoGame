import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import ActivityListItem from './components/ActivityListItem';
import {verticalBox, dateFormat} from '../../constants';

export default class AcitivityList extends React.Component {
    render() {
        const {userActivity = []} = this.props;
        const gridItemStyle = {
            ...verticalBox,
            alignItems: 'flex-start',
            paddingLeft: '10px'
        };

        return (
            <Grid container>
                <Grid 
                        item 
                        xs={12}
                        style={{
                            margin: '20px 0'
                        }}
                >
                    <Grid 
                            container
                            style={{
                                paddingLeft: '10px'
                            }}
                    >
                        <Grid 
                                item 
                                xs={5}
                                style={gridItemStyle}
                        >
                            <Text>Date</Text>
                        </Grid>
                        <Grid 
                                item 
                                xs={7}
                                style={gridItemStyle}
                        >
                            <Text>Activity</Text>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {
                        _.reverse(userActivity).map((activity, index) => (
                            <ActivityListItem
                                index={index}
                                key={index}
                                {...activity}
                            />
                        ))
                    }
                </Grid>
            </Grid>
        );
    }
}

const Text = styled.h3`
    font-size: 14px;
    color: #222;
    font-weight: 700;
`;