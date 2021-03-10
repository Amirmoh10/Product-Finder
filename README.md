
> **Note:** if the products fetch doesn't work by the time you use the demo, it would most likely be because of the API limit. If that happens, just let me know and I'll try to create a new API key with another email.

Product finder is an app that fetches and renders product data offered by the [Barcode Lookup API](https://www.barcodelookup.com/api) service. It allows users to search for product information to render this information as a card. The user can either search for a product using a keywords search or take advantage of the advanced search modal that offers additional filters.

👉🏻 [Live demo link](https://noon-task.vercel.app/)

<p align="center">
    <img alt="Demo" src="https://res.cloudinary.com/dorcersy5/image/upload/c_scale,q_100,h_400/v1613161233/demo_nedfin.gif">
</p>

## Running the project

```
npm install
npm run dev
```

## Technical decisions

### Why Next.js and not a simple React app?

The Barcode Lookup API can't be queried directly from the browser due to cors reasons. To solve that easily, I used Next.js to easily create a tiny proxy API.

### Why is my Barcode Lookup API key visible in a public Github repo?

Considering the scope of the task and the fact that the API token expires after 50 requests, I thought it should be fine.

But here are things I could have done:

- Make the repo private. The only con would be that I would need the reviewer email to provide access.
- Use a `.env` file. The only con would be that I would have to share it with you the reviewer privately.

## Used libraries

I did my best to avoid using any external dependencies to showcase my capabilities and make the app as lean as possible.

The only libraries used (besides Next.js, React, ReactDOM) are:

- `classnames`: a tiny utility to conditionally compose different classNames based on booleans.
- `react-icons/ai`: only used for the modal close icon.

### Why CSS modules?

1. The task description didn't restrict which technology to use for styling.
2. It's a very simple approach that is already supported by Next.js and at the same time avoids classnames clashes.

### Why the `Stack` component?

> **Notice:** inspired by [Braid design system](https://seek-oss.github.io/braid-design-system/components/Stack/)

The `Stack` component is a simple vertical grid with a speicied alignment and gap between elements.
Most of the application is composed out of stacks, so creating and using this component made me extremely fast and helped me avoid a lot of extra CSS.

### Manual testing

The following techniques allowed me to test different behaviours in the APP without relying on the API:
1. **Mock data:** to avoid quickly reaching the API limit (50 requests), I created a `mockData` module with a mock response.
2. **Throttling the connection in Chrome devtools:** this made it possible to test the loading behaviour by throttling a slow connection from the "Network" tab.
3. **Blocking the products request in Chrome devtools:** this made it possible to test the failed request behaviour.

## Design decisions

I did my best to go for a minimalistic design which scales well on mobile (the proof is I used only 1 media query).

### Why not show all filters along with the search string?

1. To avoid taking too much space by default, especially on mobile.
2. My assumption is that most users use mostly the search input.

### Why show products in cards?

> **Note:** inspired by [Barcode Lookup](https://www.barcodelookup.com/).

I had the choice between tables or product cards. I went for product cards because they are easier to scale accross device screens.

## About the deployment

The app is deployed on [Vercel](https://vercel.com/), since it's the best and easiest platform to deploy Next.js applications.

## It's responsive!

<figure>
    <img alt="Mobile" src="https://res.cloudinary.com/dorcersy5/image/upload/v1613161754/noon-mobile_wnydzf.png">
    <figcaption>Mobile view</figcaption>
</figure>

<figure>
    <img alt="Desktop" src="https://res.cloudinary.com/dorcersy5/image/upload/v1613161756/noon-desktop_zbukvx.png">
    <figcaption>Desktop view</figcaption>
</figure>

## Summary of the features

- Search | Users can search for products using a search string.
- Search | Users can use the advanced search feature to look for products using multiple search criteria:
  - Barcode number
  - Product name
  - Brand
  - Manufacturer
  - Search string.
- Search | In both cases, as long as all fields are empty, the search button is disabled.

- API integration | Our app fetches the data using the  [Barcode Lookup API](https://www.barcodelookup.com/api)  API and displays the search results in the form of cards where each card has:

  - Barcode number
  - Product name
  - Description
  - Brand
  - Color

- Product stores | Users can click on any product card to see the list of stores that is available in, the price in each store, and the store link.

<figure>
    <img alt="Stores modal" src="https://res.cloudinary.com/dorcersy5/image/upload/v1613159988/Stores%20modal.png">
    <figcaption>Stores modal</figcaption>
</figure>

<figure>
    <img alt="Empty stores modal" src="https://res.cloudinary.com/dorcersy5/image/upload/v1613160089/Untitled.png_ewbthc.png">
    <figcaption>Empty stores modal</figcaption>
</figure>

> **Notice:** the store link opens in a new tab to avoid disrupting the user experience.
