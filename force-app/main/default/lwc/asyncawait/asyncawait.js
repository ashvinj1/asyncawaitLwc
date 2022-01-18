import { LightningElement,wire} from 'lwc';
import getAccount from '@salesforce/apex/AsyncawaitController.getAccount';
import { createRecord } from 'lightning/uiRecordApi';
export default class asyncawait extends LightningElement {
    
     
    
    error;
    loading = false;
    data;
    isModalOpen = false;
    accountName = '';
    conlastname = '';

    async loadAccount(){
        this.loading = true;
        this.data = [];
        let dataLocal = [];
        await getAccount().then(res => {
            let accs = res.accounts;
            var localdata = [];
            accs.forEach(a => {
                let acc = {};
                acc.Id = a.Id;
                acc.Name = a.Name;
                acc.accountnumber = a.AccountNumber;
                acc.site = a.Site;
                acc.annualrevenue = a.AnnualRevenue;
                acc.email = a.Email__c;
                acc.industry = a.Industry;
                localdata.push(acc);
            });
            this.data = localdata;
        }).catch(error => {
            console.error(error);
            this.loading = false;
        });
        console.log(this.data);
        this.loading = false;
    }

    

    loadAccountsync(){}

    newAccount(){
        this.isModalOpen = true;
    }

    closeModal(){
        this.isModalOpen = false;
    }

    saveAccount(){
        this.loading=true;
        var fields = {'Name' : this.accountName};
        var objRecordInput = {'apiName' : 'Account', fields};
        createRecord(objRecordInput).then(response => {
            this.saveContact(response.id);
            this.loading = false;
            this.isModalOpen = false;

        }).then(res=>{

        }).then (res=>{

        }).catch(error => {
            console.log(JSON.stringify(error));
        }).finally(res=>{

        });

    }

    saveContact(accountId){
        var fields = {'LastName' : this.conlastname, 'AccountId' : accountId};
        var objRecordInput = {'apiName' : 'Contact', fields};
        createRecord(objRecordInput).then(response => {
            this.loading = false;
            this.isModalOpen = false;
            this.loadAccount();
        }).catch(error => {
            console.log(JSON.stringify(error));
            this.loading = false;
            this.isModalOpen = false;
        });
    }


    handleInputChange(event){
        this.accountName = event.target.name === 'accname' ? event.target.value : this.accountName;
        this.conlastname = event.target.name === 'conlastname' ? event.target.value : this.conlastname;
    }



}
