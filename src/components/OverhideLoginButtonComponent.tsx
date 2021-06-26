import React, { useRef, useEffect } from "react";

import './OverhideLoginButtonComponent.css';

import { IOverhideHub, IOverhideAppsell } from "overhide-widgets";

type OverhideLoginButtonProps = {
  hub?: IOverhideHub | null;
};

const OverhideLoginButtonComponent: React.FunctionComponent<OverhideLoginButtonProps>  = (props) => {
  const componentRef = useRef();

  useEffect(() => {
    if (!!componentRef) {
      const { current } = componentRef;
      const component = (current as unknown) as IOverhideAppsell;
      if (!!props.hub && !!component.setHub) {
        component.setHub(props.hub);
      }
    }
  }, [props.hub])

  return (
    <div>
      <overhide-appsell 
        ref={componentRef}      
        loginMessage="Login">
          <div slot="unauthorized-button" className="neopolitan-button"></div>
      </overhide-appsell>
    </div>
  );
}

export default OverhideLoginButtonComponent;
