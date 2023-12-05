import React, { useEffect, useRef } from "react";
import { GoogleIdentity } from "../../../utils/utils";

interface GoogleButtonProps {
  // onSuccess: (googleUser: any) => void;
  // onFailure: () => void;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({}) => {
  const googleButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    GoogleIdentity.renderGoogleSignInButton(googleButtonRef.current!);
  }, []);

  return <div ref={googleButtonRef} />;
};

export default GoogleButton;
