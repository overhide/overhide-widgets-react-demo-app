import React, { useRef, useEffect } from "react";

import { IOverhideHub, IOverhideLogin } from "overhide-widgets";

type OverhideLoginProps = {
  hub?: IOverhideHub | null;
};

const OverhideLoginComponent: React.FunctionComponent<OverhideLoginProps>  = (props) => {
  const componentRef = useRef();

  useEffect(() => {
    if (!!componentRef) {
      const { current } = componentRef;
      const component = (current as unknown) as IOverhideLogin;
      if (!!props.hub && !!component.setHub) {
        component.setHub(props.hub);
      }
    }
  }, [props.hub])

  return (
    <div>
      <overhide-login ref={componentRef}
                      overhideSocialMicrosoftEnabled
                      overhideSocialGoogleEnabled
                      overhideOhledgerWeb3Enabled
                      overhideEthereumWeb3Enabled
                      overhideBitcoinEnabled
                      overhideLedgerEnabled>
      </overhide-login>    
    </div>
  );
}

export default OverhideLoginComponent;
