import React from 'react';
import BottomSheet from '../../components/Alerts/BottomSheet';
import ActivityList from './index';

export default class DetailBottomSheet extends React.Component {
    render() {
        const {open = false, userActivity = {}} = this.props;

        return (
            <BottomSheet
                    open={open}
                    onClose={this.props.onClose}
                    header='User Activity'
            >
                <ActivityList userActivity={userActivity}/>
            </BottomSheet>
        );
    }
}