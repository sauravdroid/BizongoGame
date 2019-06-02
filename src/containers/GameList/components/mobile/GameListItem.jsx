import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import {verticalBox} from '../../../../constants';

export default class GameListItem extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)) {
            return true;
        }

        return false;
    }

    render() {
        const {game = {}, index = 0, style = {}} = this.props;
        let {Rank = 1, Name = '', Genre = '', Platform = ''} = game;
        const gridItemStyle = {
            ...verticalBox,
            alignItems: 'flex-start',
            paddingLeft: '5px'
        };
        const nameLength = Name.length;
        if (nameLength > 20) {
            Name = Name.substring(0, 20) + '...';
        }

        return (
            <Grid 
                    container 
                    style={{
                        ...style,
                        cursor: 'pointer',
                        height: '80px',
                        background: index % 2 === 0 
                            ? 'linear-gradient(to right, #F7FBFF, #EDF5FD)'
                            : '#fff',
                        overflowY: 'hidden'
                    }}
                    onClick={() => {this.props.onGameSelected(game)}}
            >
                <Grid 
                        item 
                        xs={2}
                        style={{...gridItemStyle, padding: 0, alignItems: 'center'}}
                >
                    <RankComponent rank={Rank} />
                </Grid>
                <Grid 
                        item 
                        xs={4}
                        style={gridItemStyle}
                >
                    <NameText>{Name}</NameText>
                </Grid>
                <Grid 
                        item 
                        xs={3}
                        style={gridItemStyle}
                >
                    <Text>{Genre}</Text>
                </Grid>
                <Grid 
                        item 
                        xs={2}
                        style={gridItemStyle}
                >
                    <Text>{Platform}</Text>
                </Grid>
            </Grid>
        );
    }
}

const RankComponent = ({rank}) => {
    return (
        <div 
                style={{
                    ...verticalBox,
                    width: '25px',
                    height: '25px',
                    borderRadius: '25px',
                }}
        >
            <RankText>{rank}</RankText>
        </div>
    );
}

const NameText = styled.h3`
    font-size: 16px;
    color: #1C1B1E;
    font-weight: 700;
`;

const Text = styled.h3`
    font-size: 14px;
    color: #1C1B1E;
    font-weight: 500;
`;

const RankText = styled.h3`
    font-size: 12px;
    font-weight: 700;
    color: #4D4D4D;
`;