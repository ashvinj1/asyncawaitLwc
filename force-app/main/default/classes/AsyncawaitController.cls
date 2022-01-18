public class AsyncawaitController {

    @AuraEnabled
    public static AccountWrapper getAccount(){
        list<Account> accList = [SELECT Id,
                                        Name,
                                        AccountNumber,
                                        Site,
                                        AnnualRevenue,
                                        Email__c,
                                        CreatedDate,
                                        Industry
                                        FROM Account
                                        ORDER BY CreatedDate DESC
                                        LIMIT 10];
        AccountWrapper accWrap = new AccountWrapper();
        accWrap.accounts = accList;
        return accWrap;
     }


    public class AccountWrapper{
        @AuraEnabled public List<Account> accounts {get; set;}

    }
}
