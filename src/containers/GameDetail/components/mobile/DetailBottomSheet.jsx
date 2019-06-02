import React from 'react';
import BottomSheet from '../../../../components/Alerts/BottomSheet';
import Layout from './Layout';

export default class DetailBottomSheet extends React.Component {
    render() {
        const {open = false, game = {}} = this.props;

        return (
            <BottomSheet
                    open={open}
                    onClose={this.props.onClose}
                    header='Game Detail'
            >
                <Layout game={game} />
            </BottomSheet>
        );
    }
}