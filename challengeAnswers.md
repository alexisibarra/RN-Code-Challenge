**A) Describe the strategy used to consume the API endpoints and the data management.**

The documentation provided for the backend was straight forward: one endpoint to get limited data of all the cocktails and one endpoint that, provided an id, returns all the data of a cocktail.

That approach presents the limitation that when hitting the list endpoint the information required for the list screen is incomplete. It is possible to hit the backend again to retrieve the information for every drink but it would be inneficient very slow and costly.

What I did was:

- Hit the list endpoint
- Take the first 10 cocktails
- One by one hit the details endpoint
- When storing the data for each drink I created an array of objects for the ingredients and it measures so it was already processed and accessible on the Details screen
- Provide a 'Load more' button to retrieve the details of the next 10 cocktails

That provides a better user experience regardless of the limitations of the design of the backend.

**B) Explain which library was used for the routing and why. Would you use the same for a consumer facing app targeting thousands of users? Why?**

I think that the best tool is that is available and does the job. Thinking that way I used [react-navigation](https://reactnavigation.org/) because I have already worked with it and I feel confortable. Furthermore is the library recommended for facebook and is has more then 16498 stars in github.

I would use it for larger applications, basically for its ease of use and configuration. Even though the application being developed is used for thousands of users it doesn't affect how the library behaves on each device so the robustness and confidence that the backup for Facebook to the library provides is very important.

**C) Have you used any strategy to optimize the performance of the list generated for the first feature?**

For the list itself I used the React Native's FlatList component because it optimizes the memory use and runs smoothly. Beyond that I follow some advice from [this guide](https://facebook.github.io/react-native/docs/optimizing-flatlist-configuration) and took the approach explained in ** Subsection A**

**D) Would you like to add any further comments or observations?**

I think that the backend must do all the hardwork and provide all the data the frontend need in the best form throgh the easiest way posible because it has more power to do it.

If the backend would have delivered the partial ingredients in the list endpoint or should have included an array of the ingredients with their messures it wouldn't have been necessary to consume time and effort (memory, bandwith, etc) to feed the information to the user.
