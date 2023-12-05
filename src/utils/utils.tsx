export class GoogleIdentity {
  static initializer: Promise<boolean> | null;
  static is_initialized: boolean = false;
  static callbackFuncion: ((response: any) => void) | null = null;

  constructor() {
    GoogleIdentity.initializer = GoogleIdentity.initializeGoogleIdentity().then(
      (val) => {
        GoogleIdentity.is_initialized = val;
        return val;
      }
    );
  }

  /*
    Initialize google identity service
  */

  static initializeGoogleIdentity(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      var script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.defer = true;
      script.async = true;
      script.onload = () => {
        (window as any).google.accounts.id.initialize({
          client_id:
            "1025507377861-ksv14u42p6c0bes203hkbki7n56u6v80.apps.googleusercontent.com",
          callback: GoogleIdentity.callbackFuncion,
        });
        console.log("Google Identity initialized");
        resolve(true);
      };
      document.body.appendChild(script);
    });
  }

  /*
   Call back function that handles google sign in action
  */

  static setCallBack(callbackFuncion: (response: any) => void) {
    GoogleIdentity.callbackFuncion = callbackFuncion;
  }

  /*
   Show google one tap popup for sign in
  */

  static showGoogleOneTapPopup() {
    if (!GoogleIdentity.initializer) new GoogleIdentity();
    GoogleIdentity.initializer!.then((val) => {
      if (val) {
        (window as any).google.accounts.id.prompt();
      }
    });
  }

  /*
   Render google sign in button
  */

  static renderGoogleSignInButton(parentElement: HTMLElement) {
    if (!GoogleIdentity.initializer) new GoogleIdentity();
    GoogleIdentity.initializer!.then((val) => {
      if (val) {
        (window as any).google.accounts.id.renderButton(parentElement, {
          theme: "dark",
          size: "large",
          type: "standard",
          text: "signin",
          shape: "pill",
          longtitle: false,
          onsuccess: GoogleIdentity.callbackFuncion,
        });
      } else {
        console.log("Google Identity not initialized");
      }
    });
  }
}
