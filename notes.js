// create new react project

// 1. create-react-app projectname
// 2. cd into project directory
// 3. code . (opens in visual code)

// inside src create folder for pages and another for components

// for each page create a .js file (login signup home..)
// to add code automatically use command 'rce'
// then remove  'export default' before class home extends component

// install react router dom : for different pages routes
// npm install --save react-router-dom

// install material ui 
// npm install --save @material-ui/core

/** redux notes
 * npm install --save redux react-redux redux-thunk
 * react-redux: library middle between react and redux
 * react-thunk : middleware gives access to Dispatch which allows to run async code in redux actions
 * 
 * steps to connect redux to react app
 * 1. create store
 * 2. import store to App.js and surround app with Provider, give Provider store,Provider can be surrounded with themeprovider or not, same thing
 * 3. create types (additional step)
 * 4. create reducers and actions
 * 5. connect component to all implementations above 
 * (do more research on redux)
 * 
 * 
 * https://thoughtbot.com/blog/using-redux-with-react-hooks << USED TO SOLVE USING LOGOUTUSER() in TOPBAR
 * https://www.digitalocean.com/community/tutorials/five-ways-to-convert-react-class-components-to-functional-components-with-react-hooks
 */

 /**
  * shouldComponentUpdate() explained

   shouldComponentUpdate(nextProps, nextState) {
        return nextProps.data.timelines !== this.props.data.timelines;

    console.log('!== ? ' , nextProps.data.timelines !== this.props.data.timelines);
    return ! nextProps.data.timelines !== this.props.data.timelines
    console.log(this.props.data);

    console.log('nextProps' , nextProps);
    console.log('nextState', nextState);
    return true;

    nextProps for array : data that is inserted or added to the array
    with pagination if we get first 5 nextProps will have them
    next 5 will be added to nextProps array so nextProps wil have 10 items etc..

    nextState is the local react state

    if (nextProps) {
        if (nextProps.data.timelines === this.props.data.timelines) {
            return false;
        } else {
            return true;
        }
    }
   }
     */

     /**
      * async setState of value then call function
*             this.setState({
                page: this.state.page + 1
            }, () => {
                if (this.state.page) {
                    console.log('getTimelines() page ' + this.state.page);
                    this.props.getTimelines(this.state.page);
                }
            });
      * 
      */

