import {ToastController} from "ionic-angular";

export let Utils = {

  handleNetworkError: (toastCtl: ToastController, error: any) => {

    let message = "An unexpected error occurred. Please try again.";

    if (error.error) {
      try {
        let errors = error.error;
        if (!errors.message) throw new Error("Message is undefined");
        message = errors.message;
      } catch (e) {

        if (error.status === 400) {
          message = `${error.status} Bad request`;
        } else if (error.status === 403) {
          message = `${error.status} Unauthorized`;
        } else if (error.status === 404) {
          message = `${error.status} Not found`;
        } else if (error.status === 500) {
          message = `${error.status} Internal server error`;
        } else {
          message = "Please check your internet connection and try again"
        }
      }
    }

    toastCtl.create({
      message: message,
      duration: 3000
    }).present();
  },

};
