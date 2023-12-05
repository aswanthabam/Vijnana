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
    // Render the Google sign-in button
    // (window as any).google.accounts.id.renderButton(
    //   googleButtonRef.current,
    //   {}
    // );

    return () => {
      // Clean up the script when the component unmounts
      //   (window as any).google.accounts.id.cancel();
    };
  }, []);

  return <div ref={googleButtonRef} />;
};

export default GoogleButton;
