import React from 'react';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import {horizontalBox, verticalBox} from '../../../../constants';

export default class Layout extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)) {
            return true;
        }

        return false;
    }

    render() {
        const {game = {}} = this.props;
        let {Rank = 1, Name = '', Genre = '', Platform = '', Year = '', Global_Sales = '', Publisher = ''} = game;

        return (
            <Grid container>
                {
                    Name.length === 0
                        ?   <div
                                    style={{
                                        minHeight: '50vh',
                                        width: '100vh',
                                        ...verticalBox
                                    }}
                            
                            >
                                <NoGameSelectedText>Please Select a Game</NoGameSelectedText>
                            </div>
                        :   <React.Fragment>
                                <Grid 
                                        item 
                                        xs={12} 
                                        style={{
                                            ...horizontalBox, 
                                            justifyContent: 'center',
                                            marginBottom: '30px',
                                            marginTop: '20px'
                                        }}
                                    >
                                    <GameName>{Name}</GameName>
                                </Grid>
                                <Grid 
                                        item 
                                        xs={12} 
                                        style={{
                                            ...horizontalBox, 
                                            justifyContent: 'center',
                                            marginBottom: '30px'
                                        }}
                                >
                                    <Tag color='#3957CF' value={Genre} />
                                    <Tag color='#45AC15' value={Year} />
                                </Grid>
                                <Grid 
                                        item 
                                        xs={12} 
                                        style={{
                                            ...horizontalBox, 
                                            justifyContent: 'center',
                                            marginBottom: '30px'
                                        }}
                                >
                                    <RankComponent rank={Rank}/>
                                </Grid>
                                <Grid 
                                        item 
                                        xs={12}
                                        style={{
                                            padding: '0 20px'
                                        }}
                                >
                                    <MetricsContainer color='#4B53E9' borderColor='#9A9FFF' label='Platform' value={Platform}/>
                                    <MetricsContainer color='#0BAFAC' borderColor='#62FAF8' label='Publisher' value={Publisher}/>
                                    <MetricsContainer color='#F13C3C' borderColor='#FFA09E' label='Global Sales' value={Global_Sales}/>
                                </Grid>
                            </React.Fragment>
                }
            </Grid>
        );
    }
}

const Tag = ({color, value}) => {
    return (
        <div 
                style={{
                    ...verticalBox,
                    border: `1px solid ${color}`,
                    borderRadius: '20px',
                    minWidth: '60px',
                    padding: '5px 10px',
                    margin: '0 5px'
                }}
        >
            <TagText color={color}>{value}</TagText>
        </div>
    );
}

const RankComponent = ({rank = 1}) => {
    return (
        <RankDiv>
            <RankText>{rank}</RankText>
            <RankLabel>Rank</RankLabel>
        </RankDiv>
    );
}

const MetricsContainer = ({color = '#4B53E9', borderColor = '#9CA1FF', label = 'Platform', value ='XBOX'}) => {
    return (
        <div 
                style={{
                    ...horizontalBox,
                    justifyContent: 'space-between',
                    paddig: '10px',
                    heigth: '44px',
                    borderBottom: '1px solid #E5E5E5',
                    height: '80px'
                }}
        >
            <div style={horizontalBox}>
                <CircularPoint color={color} borderColor={borderColor}/>
                <MetricLabel>{label}</MetricLabel>
            </div>
            <MetricValue>{value}</MetricValue>
        </div>
    );
}

const RankDiv = styled.div`
    width: 116px;
    height: 106px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, #F8B409, #FFA857);
    box-shadow: 0 4px 20px rgba(255, 144, 34, 0.51);
    border-radius: 4px;
`;

const RankText = styled.h3`
    font-weight: 700;
    font-size: 30px;
    color: #fff;
`;

const RankLabel = styled.h3`
    font-weight: 500;
    color: #fff;
    font-size: 14.5px;
`;

const MetricLabel = styled.h3`
    font-size: 14px;
    font-weight: 500;
    color: #838382;
`;

const MetricValue = styled.h3`
    font-size: 16px;
    color: #303030;
    font-weight: 700;
`;

const GameName = styled.h3`
    font-size: 26px;
    color: #1C1B1E;
    font-weight: 500;
    text-align: center;
`;

const CircularPoint = styled.div`
    height: 14px;
    width: 14px;
    border: 8px solid ${props => props.borderColor || '#9CA1FF'};
    background-color: ${props => props.color || '#4B53E9'};
    border-radius: 100%;
    margin-right: 10px;
`;

const TagText = styled.h3`
    font-size: 12px;
    color: ${props => props.color || '#3957CF'};
    font-weight: 700;
`;

const NoGameSelectedText = styled.h3`
    text-align: center;
    font-weight: 700;
    font-size: 26px;
    color: #838382;
`;