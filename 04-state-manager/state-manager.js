var StateManager = (function(){
    var _currentState = undefined,
        _callbacks = [],
        _reducer = undefined,

    function getState(){
        return _currentState;
    }

    function subscribe(callback){
        _callbacks.push(callback);
    }

    function triggerChange(){
        _callbacks.forEach(callback => callback());
    }

    function dispatch(action){
        var newState = _reducer(_currentState, action);
        if (newState === _currentState) return;
        _currentState = newState;
        triggerChange();
    }

    function createStore(reducer){
        if (typeof reducer !== 'function')
            throw new Error('A reducer is mandatory to create the store');
        _reducer = reducer;
        var store = { getState, subscribe, dispatch };
        return store;
    }

    return { createStore };
})();