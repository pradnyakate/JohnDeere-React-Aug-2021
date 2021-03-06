import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import './index.css';

import BugSort from './components/bugSort';
import BugEdit from './components/bugEdit';
import BugStats from './components/bugStats';
import BugList from './components/bugList';

import bugActionCreators from './actions';

class BugTracker extends React.Component {
    render() {
        const { bugs, addNew, toggle, remove, removeClosed } = this.props;
        return (
            <>
                <h3>Bug Tracker</h3>
                <hr />
                <BugStats bugs={bugs} />
                <BugSort />
                <BugEdit addNew={addNew} />
                <BugList {...{ bugs, toggle, remove, removeClosed }} />
            </>
        )
    }
}

//transforming the storeState into the props for the component
function mapStateToProps(storeState){
    const bugs = storeState.bugsData;
    return { bugs : bugs };
}

//transforming the 'dispatch' into props for the component
function mapDispatchToProps(dispatch){
    const bugActionDispatchers = bindActionCreators(bugActionCreators, dispatch);
    return bugActionDispatchers;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BugTracker);