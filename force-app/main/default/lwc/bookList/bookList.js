import { LightningElement, track } from 'lwc';
import getBooks from '@salesforce/apex/BookController.getBooks';

import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BookList extends LightningElement {
    @track books;
    @track selectedBookId;
    @track showModal = false;

    columns = [
        { label: 'Title', fieldName: 'Title__c' },
        { label: 'Author', fieldName: 'Author__c' },
        { label: 'Genre', fieldName: 'Genre__c' },
        { label: 'Price', fieldName: 'Price__c'},
        { label: 'Stock Quantity', fieldName: 'Stock_Quantity__c'},
        {
            type: 'button',
            typeAttributes: {
                label: 'Edit',
                name: 'edit',
                iconName: 'utility:edit',
                class: 'btn_edit'
            }
        },
        {
            type: 'button',
            typeAttributes: {
                label: 'Delete',
                name: 'delete',
                variant: 'destructive'
            }
        }
    ];

    connectedCallback() {
        this.loadBooks();
    }

    loadBooks() {
        getBooks()
            .then(result => {
                this.books = result;
            })
            .catch(error => {
                console.error('Error retrieving books:', error);
            });
    }

    handleCreateNew() {
        this.selectedBookId = null;
        this.showModal = true;
        this.template.querySelector('c-book-modal').openModal();
    }

    handleEdit(event) {
        this.selectedBookId = event.target.row.id;
        this.showModal = true;
        const bookModal = this.template.querySelector('c-book-modal');
        bookModal.bookId = this.selectedBookId;
        bookModal.openModal();
    }

    // Example of an event handler
    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        if (actionName === 'edit') {
            this.selectedBookId = row.Id;
            this.showModal = true;
            const bookModal = this.template.querySelector('c-book-modal');
            bookModal.bookId = this.selectedBookId;
            bookModal.openModal();
        } else if (actionName === 'delete') {
            this.handleDelete(row.Id);
        }
    }

    async handleDelete(recordId) {
        try {
            await deleteRecord(recordId);
            this.showToast('Success', 'Book record deleted successfully!', 'success');
            // Refresh book list
            this.books = this.books.filter(book => book.Id !== recordId);
        } catch (error) {
            console.error('Error deleting book:', error);
            this.showToast('Error', 'Error deleting book record', 'error');
        }
    }

    showToast(title, message, variant) {
        const toastEvent = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(toastEvent);
    }

    handleModalClose() {
        this.showModal = false;
        this.loadBooks(); // Refresh the book list after the modal is closed
    }


}