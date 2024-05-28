trigger PreventDuplicateBooks on Book__c (before insert, before update) {
    // Map to store existing book records based on Title and Author combination
    Map<String, Book__c> existingBooksMap = new Map<String, Book__c>();

    // Collect existing book records based on Title and Author combination
    for (Book__c existingBook : [SELECT Id, Title__c, Author__c FROM Book__c]) {
        existingBooksMap.put(existingBook.Title__c + '-' + existingBook.Author__c, existingBook);
    }

    // Check for duplicate entries for new and updated book records
    for (Book__c newBook : Trigger.new) {
        String key = newBook.Title__c + '-' + newBook.Author__c;
        
        // Check if the new book record's Title and Author combination already exists
        if (existingBooksMap.containsKey(key) && (Trigger.isInsert || (Trigger.isUpdate && existingBooksMap.get(key).Id != newBook.Id))) {
            newBook.addError('A book with the same Title and Author already exists.');
        }
    }
}
