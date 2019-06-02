import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import {
    MuiThemeProvider,
    createMuiTheme
} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import Game from './containers/Game';
import {primaryColor} from './constants';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: primaryColor
        },
    }
});

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                    <div className="App">
                        <Switch>
                            <Route exact={true} path='/' component={Game} />
                            <Route exact={true} render={() => <h3>Page Not Found</h3>} />
                        </Switch>
                    </div>
            </MuiThemeProvider>
        );
    }
}

export default withRouter(App);