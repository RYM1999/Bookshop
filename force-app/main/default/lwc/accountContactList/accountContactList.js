import { LightningElement, wire} from 'lwc';
import getAccounts from '@salesforce/apex/AccountContactController.getAccounts';
import getContactsByAccountId from '@salesforce/apex/AccountContactController.getContactsByAccountId';

export default class AccountContactList extends LightningElement {
    accounts;
    contacts;
    selectedAccountId;

    columns = [
        { label: 'Contacts Name', fieldName: 'Name' }   
        
    ];

    @wire(getAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data.map(account => {
                return { label: account.Name, value: account.Id };
            });
        } else if (error) {
            console.error('Error retrieving accounts:', error);
        }
    }

    get accountOptions() {
        return this.accounts ? this.accounts : [];
    }

    handleAccountChange(event) {
        this.selectedAccountId = event.detail.value;
        this.contacts = null;

        getContactsByAccountId({ accountId: this.selectedAccountId })
            .then(result => {
                this.contacts = result;
            })
            .catch(error => {
                console.error('Error retrieving contacts:', error);
            });
    }
}
