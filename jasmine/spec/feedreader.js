// This spec file contains all tests that Jasmine framework will use during the testing.

// All the tests are within the $() function, to ensure they don't run until the DOM is ready.
$(function() {

    // This is the first test suite that contains a related set of the RSS Feed tests.
    describe('RSS Feeds', function() {
        // 1st test - makes sure that allFeeds variable has been defined and that it's not empty.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // 2nd test - loops through each feed in the allFeeds object and ensures it has a defined, not empty URL.
        it('loops through each feed and has a defined, not empty URL', function() {
            allFeeds.forEach(function(item) {
                expect(item.url).toBeDefined();
                //expect(item.url).not.toBe('');
                expect(item.url.length).not.toBe(0);
            });
        });

        // 3rd test - loops through each feed in the allFeeds object and ensures it has a defined, not empty name.
        it('loops through each feed and has a name defined and not empty', function() {
            allFeeds.forEach(function(item) {
                expect(item.name).toBeDefined();
                expect(item.name.length).not.toBe(0);
            });
        });
    });


    // This is the second test suite, that contains a related set of the menu tests.
    describe('The menu', function() {
        // 4th test - ensures that the menu element is hidden by default.
        it('should hide the menu element by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // 5th test - ensures that the menu changes visibility when the menu icon is clicked.
        it('should change visibility when the menu icon is clicked', function() {
           // expecting that menu is clicked and then openes
           $('.menu-icon-link').click();
           expect($('body').hasClass('menu-hidden')).toBe(false);
           // expecting that menu is clicked again and then hidden
           $('.menu-icon-link').click();
           expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    // This is the third test suite.
    describe('Initial Entries', function() {
        /* 6th test - ensures when the loadFeed asynchronous function is called and completes its work,
         * there's at least a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
               done();
            });
        });

        it('ensures that exists at least a single .entry element within the .feed container', function(done) {
          expect($('.feed .entry').length).toBeGreaterThan(0);
             done();
        });
    });


    // This is the fourth test suite.
    describe('New Feed Selection', function() {
        // 7th test - that ensures when a new feed is loaded by the loadFeed asynchronous function that the content actually changes.
        var feedOne, // variables that hold the values of two feeds
            feedTwo;

        beforeEach(function(done) {
            loadFeed(0, function() {
                feedOne = $('.feed').html();
                loadFeed(1, function() {
                   feedTwo = $('.feed').html();
                   done();
                });
            });
        });

        it('a new feed is loaded and content changes', function(done) {
            expect(feedOne).not.toEqual(feedTwo);
            done();
        });
    });

}());
