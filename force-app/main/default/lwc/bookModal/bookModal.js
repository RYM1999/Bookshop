import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BookModal extends LightningElement {
    @api bookId;
    @track isOpen = false;

    @api
    openModal() {
        this.isOpen = true;
    }

    closeModal() {
        this.isOpen = false;
        this.dispatchEvent(new CustomEvent('close'));
    }

    handleSuccess(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Book record saved successfully!',
                variant: 'success'
            })
        );
        this.closeModal();
    }

    handleCancel() {
        this.closeModal();
    }
}
