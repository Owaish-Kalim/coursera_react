import React from 'react';
import { Media } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { Fade, Stagger } from "react-animation-components";

function RenderLeader(props) {
  
  if (props.leaderLoading) {
    return <Loading />;

  } else if (props.leaderErrMess) {
    return <h4>{props.leaderErrMesserrMess}</h4>;
  }
  
  const leaders = props.leaders.leaders.map((leader) => {
        return (
          <Fade in>
            <div key={leader.id} className="col-12 mt-5">
              <Media tag="li">
                <Media left middle>
                    <Media object src={baseUrl + leader.image} alt={leader.name} />
                </Media>
                <Media body className="ml-5">
                  <Media heading>{leader.name}</Media>
                  <p>{leader.description}</p>
                </Media>
              </Media>
            </div>
          </Fade>
          );
      });

      return (
        <div className="container">
          <div className="row">
            <Media list>
              <Stagger in>
                {leaders}
              </Stagger>
            </Media>
          </div>
        </div>
      );
}

export default RenderLeader ;