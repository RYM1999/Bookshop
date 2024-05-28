public with sharing class BookController {
    @AuraEnabled(cacheable=true)
    public static List<Book__c> getBooks() {
        return [SELECT Id, Title__c, Author__c, Genre__c, Price__c, Stock_Quantity__c FROM Book__c];
    }

    @AuraEnabled (cacheable=true)
    public static void deleteBook(Id bookId) {
        delete [SELECT Id FROM Book__c WHERE Id = :bookId];
    }
}
