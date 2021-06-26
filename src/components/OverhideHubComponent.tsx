import React, { useRef, useState, useEffect } from "react";

import { IOverhideHub } from "overhide-widgets";

type OverhideHubProps = {
  isTest: boolean;
  onHubInit?: (hub: IOverhideHub) => void;
  onPendingTransaction?: ( currency: string, isPending: boolean) => void;
};

const OverhideHubComponent: React.FunctionComponent<OverhideHubProps>  = (props) => {
  const hubRef = useRef();
  const BACKEND_CONNECTION_STRING = `https://demo-back-end.azurewebsites.net/api`;

  const [token, setToken] = useState<string | null>(null);

  const invokeOnPendingTransaction = (event: any) => {
    if (!props.onPendingTransaction) {
      return;
    }
    props.onPendingTransaction(event.detail.currency, event.detail.isPending)
  }
  
  useEffect(() => {
    if (!!props.onHubInit) {
      const {current} = hubRef;
      const hub: IOverhideHub = (current as unknown) as IOverhideHub;
      props.onHubInit(hub);
    }

    fetch(`${BACKEND_CONNECTION_STRING}/GetToken`)
    .then(async (response) => {
      if (response.ok) {            
        setToken(await response.text());
      } else {
        console.error(`error talking to back-end -- ${response.status} &mdash; ${response.statusText}`);
      }
    }).catch(e => console.error(`error talking to back-end -- ${e}`));
  }, [hubRef]);

  useEffect(() => {
    const {current} = hubRef;
    const element = (current as unknown) as HTMLElement;
    // This event fires whenever we're asked to topup funds.
    // We're using it here to show the VISA instructional helper image.
    element.addEventListener('overhide-hub-pending-transaction', invokeOnPendingTransaction);
    return () => element.removeEventListener('overhide-hub-pending-transaction', invokeOnPendingTransaction);
  }, [hubRef]);

  return (
    <div>
      <overhide-hub ref={hubRef} token={token} isTest={props.isTest}></overhide-hub>
    </div>
  );
}

export default OverhideHubComponent;
