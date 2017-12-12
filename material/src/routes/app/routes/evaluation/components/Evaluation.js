import React from 'react';
import QueueAnim from 'rc-queue-anim';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; //for user prop-types
import {bindActionCreators} from 'redux';
import {
  evaluationGetByIdRequest,
} from '../../../../../actions';

const optionsName = "Evaluation";

class MainOptions extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <article className="article padding-lg-v article-bordered">
        <div className="container-fluid with-maxwidth">
          <div className="row">
            <div className="col-xl-3">

              <div className="box-body">
                <div className="icon-box ibox-plain ibox-center">
                  <div className="ibox-icon">
                    <a href="javascript:;"><i className="material-icons">assignment</i></a>
                  </div>
                  <h5>{optionsName}es</h5>
                </div>
              </div>

            </div>
            <div className="col-xl-9">
              <div className="row">

                <div className="col-xl-4">
                  <div className="box box-default">
                    <div className="box-body">
                      <div onClick={() => this.props.changeView("VIEW_ELEMENT") } className="icon-box ibox-plain ibox-center">
                        <div className="ibox-icon">
                          <a><i className="material-icons">remove_red_eye</i></a>
                        </div>
                        <h6>Listo of evaluations</h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4">
                  <div className="box box-default">
                    <div className="box-body">
                      <div className="icon-box ibox-plain ibox-center">
                        <div className="ibox-icon">
                          <a href="javascript:;"><i className="material-icons">add_circle_outline</i></a>
                        </div>
                        <h6>Pass evaluation</h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4">
                  <div className="box box-default">
                    <div className="box-body">
                      <div className="icon-box ibox-plain ibox-center">
                        <div className="ibox-icon">
                          <a href="#/app/program"><i className="material-icons">insert_chart</i></a>
                        </div>
                        <h6>Statics</h6>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </article>
    )
  };
}




class Evaluation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "VIEW_ELEMENT",
    };
  }

  componentWillMount(){
    if(this.props.location.query.id){
      this.props.actions.evaluationGetByIdRequest(this.props.location.query.id)
        .then((response) => {
          console.log(response)
        });
    }
  }

  /*onEditProgram(divisionData) {
    this.setState({divisionData});
    this.changeView('ADD_ELEMENT', false);
  }

  changeView(data, reset = true) {
    if (reset) {
      this.setState({divisionData: {}})
    }
    this.setState({active: data});
  }

  onCreateGroup(divisionId){
    this.context.router.push({
      pathname: '/app/groups',
      query: {
        divisionId : divisionId,
        typeCategory : 'division',
        add : 'true'
      }
    })
  }*/

  /*onViewGroup(divisionId){
    this.context.router.push({
      pathname: '/app/groups',
      query: {
        id : divisionId,
        typeCategory : 'division',
        view : 'true'
      }
    })
  }*/

  /*activeView() {
    switch (this.state.active) {
      case 'ADD_ELEMENT':
        return <EditForm changeView={this.changeView} divisionData={this.state.divisionData}/>;
      case "VIEW_ELEMENT":
        return <ListElements onEdit={this.onEditProgram} onViewGroup={this.onViewGroup} onCreateGroup={this.onCreateGroup}/>;
      default:
        return null;
    }
  }*/

  render() {
    return (
      <div className="container-fluid no-breadcrumbs page-dashboard">

        <QueueAnim type="bottom" className="ui-animate">
          <div key="1"><MainOptions changeView={ this.changeView } /></div>
          {/*<hr/>
          <div key="2">{ this.activeView() }</div>*/}
        </QueueAnim>

      </div>
    );
  }
}

//To get the routers
Evaluation.contextTypes = {
  router: PropTypes.object.isRequired
};


/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      evaluationGetByIdRequest
    }, dispatch)
  };
}

module.exports = connect(
  null,
  mapDispatchToProps,
)(Evaluation);
