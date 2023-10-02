# infinite-scroll
infinitely scrolling webpage project

## How To Use ##

    1. Download the latest release bundle and extract it.
    2. Load the main.html file into your favorite browser.
    3. Scroll infinitely through the Items.
    4. Remember to take a break!

## Summary ##
Infinite scrolling is a User Interface design pattern well suited for browsing through a large or endless stream of items.  

### Benefits ###
1. **Reduce Interruptions**: It provides the user an uninterrupted stream of content and maintains their engagement without having to actively decide to load new content and wait for it to load.
2. **Lowers Interaction**: Users don't have to actively decide to load more content by clicking a button. Also navigating back is easier because the content is all loaded already.
3. **Well Suited to Mobile Devices**: Users are used to scrolling on mobile devices because of the small screen size.  Infinite scrolling allows them to use a natural motion to navigate.

### Drawbacks ###
1. **Refinding Items**: it can be tough to refind a specific item that you've already seen.  The user is required to remember where in the infinite scroll they saw the item and navigate back
2. **Increases Page Load**: Items are added continuously and consume more and more computing resources.  This can particularly be a problem on mobile devices with limited bandwidth
3. **Accessability Issues**: Users who are keyboard only can find scrolling via page up/down or tabbing to be more arduous in an infinite scrolling design as opposed to a more traditional pagination design.

### Alternatives ###
1. **Pagination**: Display a "page" of data at a time and have forward/back buttons to navigate to the next/previous page. Better for accessability and reducing page load.
2. **Scrolling with Load More button**: This is a sort of hybrid approach.  You get the benefit of scrolling, while giving the user some agency on if they want to continue browsing.

## Research ##
I began by wanting to learn more about infinite scrolling as a design pattern.  What UI/UX problems is it trying to solve?  I discovered this article by searching for  "infinite scroll best practices":

[Infinite Scrolling: When to Use It, When to Avoid It](https://www.nngroup.com/articles/infinite-scrolling-tips/)

The traditional model of incrementally retrieving and displaying streams of information is pagination.  In sites with pagination, the user has to actively click on a next button to see more data.  Studies showed that even this short interuption can cause users to do something else.

Infinite scrolling was designed to simplify user input in order to maintain user engagement.  Primary use cases are usually around browsing,  i.e.  users not looking for something specific.  Social media, news feeds, ecommerce shopping platforms all make use of infinite scrolling.  Infinite scrolling is particularly effective on mobile devices, where our natural behaviour is to scroll to overcome the small display.  We are used to scrolling even to read a single article, so the motion is very natural on a mobile device.

Downsides to infinite scrolling include difficulty refinding content, ever increasing page load, and accessability issues.  As you scroll through an infinite list it can be difficult to remember where you saw something interesting in order to return to it.  Users have to somewhat aimlessly scroll up in order to return to a specific item.  As you continue to add more and more items to the page the page can become sluggish as it is consuming more compute resources to process.  It can also be difficult for users with accessability issues, particularly keyboard only users as paging through or tabbing through infinite data can be arduous compared to using a scroll wheel.

## Implementation ##
With a better understanding of the design philosophy behind infinite scrolling I proceeded to research implementation.  I searched for "infinite scroll js implementation" and discovered this article:

[Infinite Scroll - web.dev](https://web.dev/patterns/web-vitals-patterns/infinite-scroll/infinite-scroll/)

Traditionally in vanilla javascript infinite scrolling could be implemented by adding event listeners to the scroll event and within that listener determining if something was visible which would signal that the page needed to load more data.  The "something" is usually some kinda placeholder on the page that is where the user would be nearing the end of the content, so we would load more just in time for them to scroll onto it.  This can be sluggish as the listener must continually poll and do the math to determine if it's time to load something new.

I decided to use the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to implement the design.  This tells the browser to watch for the intersection in a callback offloading the work from the running javascript, which is much more performant.

I started to implement my page exactly as described in the [Infinite Scroll - web.dev](https://web.dev/patterns/web-vitals-patterns/infinite-scroll/infinite-scroll/) article, but I realized this was adding scope as the "Load More" button, while nice and solving some of the issues of infinite scrolling, was not originally asked for in the task.  I decided to implement exactly what was asked for, and then if I had time, loop back to enhance the design.

 - **HTML**: The initial page is very basic, with a title and an container to hold the items we will load in via JS
 - **CSS**: The css just bounds the content to 80% of the screen and utilizes inline-block display to display 4 columns of data, each alotted 20% of each line (plus margins).
- **JS**: The javascript will run loadNewItems to get an initial block of 10 items.  These items will then be added to the "items observer" so that when they are on screen they will become visible.  The last item is added to the "last item observer" so that when it is on screen we will call loadNewItems again to produce 10 more items.  Rince, Repeat.

## Example Questions ##

1. **How would you approach this type of task working with a team of software engineers?**
    I would approach it as collaboratively as possible,  starting with a meeting to discuss the assignment and how we would all approach it.  I would collectively want to research the best practices around the design and the alternatives.  As a group we would decide which to implement.

    Implementation wise this is a small project with few files.  My preference would be to implement it in a pair/mob programming model, working on it together in real time.  If we were implementing an actual server to get the content, I would likely split into a client/server side teams with one team implementing the UI, and one team implementing the data retrieval API.
2. **Compare and contrast an infinite scroll design versus alternatives and when you may choose one over another.**
    I talked about this earlier and the main alternative is pagination.  Infinite scrolling is better suited to browsing and mobile, where the interaction is natural, and they are not looking for anything in particular.

    Pagination is better for accessability and managing resource load, as only a specified number if items is available at one time.  This can hinder user engagement as they have to actively decide to load more data and wait for that to occur.
3. **If this page were part of a web application accessible to a lot of users, how might it be improved to handle the additional load on it?**
    This particular implementation doesn't really have load constraints on it as all of the processing is occuring for a single user in the browswer.  In a real web application the loadNewItems method would make a call to the server side to retrieve more data.  This is where you would run into load issues as you would need to wait for the server to respond.  

    In that case I would implement the design in the [Infinite Scroll - web.dev](https://web.dev/patterns/web-vitals-patterns/infinite-scroll/infinite-scroll/) article, which contains a "Loading" message.  When the user is scrolling slowly enough for the items to return and render before being visible, they will never see this message.  If the users scrolls faster than the conten loads, they will be shown the "Loading" message, which will stop their scroll, and update to a "Show More" button when the content is ready to be shown.
4. **Bugs happen!  How might you code to facilitate debugging when bugs occur in production and testing?**
    In a development environment I would use the live debugging tools available in most modern browsers.  That provides the most control and observability into what is happening.  In a production/test environment I would likely utilize console logging to provide the observability I needed.  I would add console.log message about key pieces of data and states of the js code to get a clearer picture on what was actually happening in the code.


## Extras ##

In the extra folders I implemented an infinite pagination page.  This design pattern is the primary alternative to scrolling for displaying large amounts of information.  Advantages include:

1. **Continued access to header/footer**: since the page doesn't extend and scroll you can always see the header and footer.
2. **Page load stays small and consistent**: since you are only ever loading a page of items at a time,  the resources used for the page stay managable and consistant,  instead of ever increasing like the scrolling pattern.