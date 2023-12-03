export class GoogleIdentity {
  static initializer: Promise<boolean>;
  static is_initialized: boolean = false;

  constructor() {
    GoogleIdentity.initializer = this.initializeGoogleIdentity().then((val) => {
      GoogleIdentity.is_initialized = val;
      return val;
    });
  }

  initializeGoogleIdentity(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      var script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.defer = true;
      script.async = true;
      script.onload = () => {
        (window as any).google.accounts.id.initialize({
          client_id:
            "1025507377861-ksv14u42p6c0bes203hkbki7n56u6v80.apps.googleusercontent.com",
          callback: this.handleGoogleSignIn,
        });
        console.log("Google Identity initialized");
        resolve(true);
      };
      document.body.appendChild(script);
    });
  }

  handleGoogleSignIn(response: any) {
    console.log(response);
  }

  showGoogleOneTapPopup() {
    if (GoogleIdentity.is_initialized)
      (window as any).google.accounts.id.prompt();
  }

  renderGoogleSignInButton(parentElement: HTMLElement) {
    if (GoogleIdentity.is_initialized)
      (window as any).google.accounts.id.renderButton(parentElement, {
        theme: "outline",
        size: "large",
        text: "Sign in with Google",
        shape: "rectangular",
        width: "auto",
        height: "auto",
        longtitle: true,
        onsuccess: this.handleGoogleSignIn,
      });
  }
}
