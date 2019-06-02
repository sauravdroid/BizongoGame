import React from 'react';
import _ from 'lodash';
import Media from 'react-media';
import moment from 'moment';
import {reactLocalStorage} from 'reactjs-localstorage';
import LayoutMobile from './components/mobile/Layout';
import LayoutDesktop from './components/desktop/Layout';
import ActivityBottomSheet from '../ActivityList/ActivityBottomSheet';
import {dateFormat} from '../../constants';

const userActivityKey = 'user_activity';

export default class GameComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGame: {},
            gameDetailBottomSheetOpen: false,
            activityBottomSheet: false,
            userActivity: []
        };
    }
    
    initializeUserActivity = () => new Promise((resolve, reject) => {
        try {
            const userActivity = reactLocalStorage.getObject(userActivityKey);
            if (userActivity[0] !== undefined) {
                this.setState({userActivity}, () => {
                    resolve(true);
                });
            } else {
                resolve(true);
            }
        } catch(err) {
            reject(err);
        }
    })

    addUserActivity = activity => {
        const userActivity = _.map(this.state.userActivity, _.cloneDeep);
        const date = moment().format(dateFormat);
        const data = {date, activity};
        userActivity.push(data);
        this.setState({userActivity});
        reactLocalStorage.setObject(userActivityKey, userActivity);
    }

    componentWillMount() {
        this.initializeUserActivity();
    }

    onGameSelected = game => {
        this.setState({selectedGame: game}, () => {
            this.addUserActivity('Clicked - ' + _.get(game, 'Name', ''))
            this.toggleBottomSheet();
        });
    }

    toggleBottomSheet = () => {
        this.setState({gameDetailBottomSheetOpen: !this.state.gameDetailBottomSheetOpen});
    }

    toggleActivityBottomSheet = () => {
        this.setState({activityBottomSheet: !this.state.activityBottomSheet});
    }

    render() {
        return (
            <React.Fragment>
                <ActivityBottomSheet 
                    open={this.state.activityBottomSheet}
                    onClose={this.toggleActivityBottomSheet}
                    userActivity={this.state.userActivity}
                />
                <Media 
                    query="(max-width: 800px)"
                    render={() => (
                        <LayoutMobile 
                            onGameSelected={this.onGameSelected}
                            gameDetailBottomSheetOpen={this.state.gameDetailBottomSheetOpen}
                            selectedGame={this.state.selectedGame}
                            toggleGameDetailBottomSheet={this.toggleBottomSheet}
                            addUserActivity={this.addUserActivity}
                            toggleActivityBottomSheet={this.toggleActivityBottomSheet}
                        />
                    )}
                />
                <Media 
                    query="(min-width: 801px)"
                    render={() => (
                        <LayoutDesktop 
                            onGameSelected={this.onGameSelected}
                            gameDetailBottomSheetOpen={this.state.gameDetailBottomSheetOpen}
                            selectedGame={this.state.selectedGame}
                            toggleGameDetailBottomSheet={this.toggleBottomSheet}
                            addUserActivity={this.addUserActivity}
                            toggleActivityBottomSheet={this.toggleActivityBottomSheet}
                        />
                    )}
                />
            </React.Fragment>
        );
    }
}