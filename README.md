# infinite-scroll
infinitely scrolling webpage project


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

