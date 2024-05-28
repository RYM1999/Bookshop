import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BookForm extends LightningElement {
    @api bookId;
   

   

    handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: 'Success',
            message: 'Book record saved successfully!',
            variant: 'success'
        });
        this.dispatchEvent(toastEvent);
        this.handleClose();
    }

    handleCancel() {
        this.handleClose();
    }

    handleClose() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);
    }
}
