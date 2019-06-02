import React from 'react';
import _ from 'lodash';
import {reactLocalStorage} from 'reactjs-localstorage';
import windowDimensions from 'react-window-dimensions';
import VirtualList from 'react-tiny-virtual-list';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import CustomOutlinedInput from '../../components/Inputs/CustomOutlinedInput';
import GameListItem from './components/mobile/GameListItem';
import GameListHeader from './components/mobile/GameListHeader';
import Loader from '../../components/Loader/Loader';
import {fetchGameList} from './utils';
import {horizontalBox} from '../../constants';

const gameListKey = 'game_list';
let autCompleteTimeOut = null;

class GameList extends React.Component {
    constructor(props) {
        super(props);
        this.actualGameList = [];
        this.state = {
            shouldShowDownloadButton: true,
            gameList: [],
            searchLoading: false,
            sortBy: 'Rank',
            sortDirection: 'asc',
            loadingData: false,
            sortMenuAnchorEl: null,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)) {
            return true;
        }

        return false;
    }

    initializeGameList = () => new Promise((resolve, reject) => {
        try {
            const gameList = reactLocalStorage.getObject(gameListKey);
            const shouldDownloadData = gameList[0] === undefined;
            if (shouldDownloadData) {
                this.setState({loadingData: true});
                this.props.addUserActivity('Game List - N/W Request');
                fetchGameList()
                .then(gameData => {
                    this.setState({gameList: gameData});
                    this.props.addUserActivity('Loaded data in Localstorage');
                    this.actualGameList = gameData;
                    reactLocalStorage.setObject(gameListKey, gameData);
                })
                .finally(() => {
                    this.setState({loadingData: false});
                })
            } else {
                this.props.addUserActivity('Loaded data from Localstorage');
                this.actualGameList = gameList;
                this.setState({gameList, shouldShowDownloadButton: false}, () => {
                    resolve(true);
                })
            }
        } catch(err) {
            reject(err);
        }
    })

    componentWillMount() {
        this.initializeGameList()
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log('Error ', err.message);
        });
    }

    handleAutoComplete = e => {
        const value = e.target.value;
        clearTimeout(autCompleteTimeOut);
        autCompleteTimeOut = setTimeout(() => {
            this.setState({searchLoading: true});
            const queryString = new RegExp(value, 'i');
            Promise.filter(this.actualGameList, item => {
                const {Name = ''} = item;
                return Name.search(queryString) > -1 && item !== undefined;
            })
            .then(filteredList => {
                this.props.addUserActivity('Searched ' + value);
                // const sortedList = quickSort(filteredList, 0, filteredList.length - 1, 'year');
                const sortedList = _.orderBy(filteredList, [this.state.sortBy], [this.state.sortDirection]);
                this.props.addUserActivity('Sorted list based on ' + this.state.sortBy);
                this.setState({gameList: sortedList});
            })
            .catch(err => {
                console.log('Error ', err.message);
            })
            .finally(() => {
                this.setState({searchLoading: false});
            })
        }, 300);
    }

    renderListItem = ({
        key,
        index,
        isScrolling,
        isVisible,
        style
    }) => {
        const {gameList = []} = this.state;
        console.log(index);
        return (
            <GameListItem
                style={style}
                key={key}
                index={index}
                {...gameList[index]}
            />
        );
    }

    onSortingMenuClicked = (e) => {
        this.setState({ sortMenuAnchorEl: e.currentTarget });
    }

    onSortingMenuClosed = (sortBy = this.state.sortBy, sortDirection = this.state.sortDirection) => {
        this.setState({ sortMenuAnchorEl: null, sortBy, sortDirection}, () => {
            const sortedList = _.orderBy(this.state.gameList, [this.state.sortBy], [this.state.sortDirection]);
            this.props.addUserActivity('Sorted list based on ' + this.state.sortBy);
            this.setState({gameList: sortedList});
        });
    }

    render() {
        const {gameList = []} = this.state;
        const {width = 375, height = 762} = this.props;
        

        return (
            <Grid 
                    container
            >
                {
                    this.state.loadingData &&
                    <Loader />
                }
                {
                    !this.state.loadingData &&
                    <React.Fragment>
                        <Grid 
                                item 
                                xs={12}
                                style={{
                                    ...horizontalBox,
                                    padding: width <= 800 ? '10px' : 0
                                }}
                        >
                            <CustomOutlinedInput 
                                placeholder='Search Stocks'
                                onChange={this.handleAutoComplete}
                                style={{
                                    width: '100%',
                                    height: '60px'
                                }}
                            />
                            {
                                this.state.searchLoading &&
                                <CircularProgress style={{marginLeft: '20px'}}/>
                            }
                            {
                                !this.state.searchLoading &&
                                <IconButton 
                                        onClick={this.onSortingMenuClicked}
                                        style={{
                                            marginLeft: '20px'
                                        }}
                                >
                                    <Icon>sort</Icon>
                                </IconButton>
                            }
                            <SortingMenu 
                                anchorEl={this.state.sortMenuAnchorEl}
                                handleClose={this.onSortingMenuClosed}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <GameListHeader />
                        </Grid>
                        <Grid item xs={12}>
                            {
                                !this.state.loadingData &&
                                <VirtualList
                                    width='100%'
                                    height={height - 115}
                                    itemCount={gameList.length}
                                    itemSize={80}
                                    renderItem={({index, style}) => (
                                        <GameListItem
                                            style={style}
                                            key={index}
                                            index={index}
                                            onGameSelected={this.props.onGameSelected}
                                            game = {gameList[index]}
                                        />
                                    )}
                                />
                            }
                        </Grid>
                    </React.Fragment>
                }
            </Grid>
        );
    }
}

// export default windowSize(GameList);
export default windowDimensions()(GameList);

const SortingMenu = ({anchorEl, handleClose}) => {
    return (
        <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleClose('Rank')}
        >
            <MenuItem onClick={() => handleClose('Rank', 'asc')}>Rank</MenuItem>
            <MenuItem onClick={() => handleClose('Name', 'asc')}>Name</MenuItem>
        </Menu>
    );
}