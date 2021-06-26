import React, { useRef, useEffect } from "react";

import { IOverhideHub, IOverhideStatus } from "overhide-widgets";

type OverhideStatusProps = {
  hub?: IOverhideHub | null;
};

const OverhideStatusComponent: React.FunctionComponent<OverhideStatusProps>  = (props) => {
  const componentRef = useRef();

  useEffect(() => {
    if (!!componentRef) {
      const { current } = componentRef;
      const component = (current as unknown) as IOverhideStatus;
      if (!!props.hub && !!component.setHub) {
        component.setHub(props.hub);
      }
    }
  }, [props.hub])

  return (
    <div>
      <overhide-status ref={componentRef}></overhide-status>
    </div>
  );
}

export default OverhideStatusComponent;
